'use strict'
require('svelte/ssr/register')

var assert = require('assert')
var agent = require('supertest')
var Rill = require('rill')

describe('Rill/Svelte', function () {
  it('should work on the server', function () {
    var serverRender = require('../server')
    var View = require('./build/server')
    var request = agent(
      Rill()
        .use(serverRender())
        .get('/', function (ctx, next) {
          ctx.locals.req = ctx.req
          ctx.locals.hello = 'world'
          ctx.res.body = View
          return next()
        })
        .listen()
    )

    return request
      .get('/')
      .expect(200)
      .expect(function (res) {
        assert.equal(
          res.text,
          '<div>world 127.0.0.1</div>'
        )
      })
      .expect('content-type', 'text/html; charset=UTF-8')
  })

  it('should work on the browser', function () {
    var browserRenderer = require('../client')
    var View = require('./build/browser')
    var request = agent(
      Rill()
        .use(browserRenderer())
        .get('/', function (ctx, next) {
          ctx.locals.req = ctx.req
          ctx.locals.hello = 'world'
          ctx.res.body = View
          return next()
        })
        .listen()
    )

    return request
      .get('/')
      .expect(200)
      .expect(function (res) {
        assert.equal(
          document.body.innerHTML,
          '<div>world 127.0.0.1</div>'
        )
      })
      .expect('content-type', 'text/html; charset=UTF-8')
  })
})
