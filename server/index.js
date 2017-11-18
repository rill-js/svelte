'use strict'

var statuses = require('statuses')

/**
 * Creates a Rill middleware that renders a svelte component.
 *
 * @param {object} options - The options for the middleware.
 * @return {function}
 */
module.exports = function svelteMiddlewareSetup (options) {
  return function svelteMiddleware (ctx, next) {
    return next().then(function renderSvelteComponent () {
      var res = ctx.res
      var locals = ctx.locals
      var Component = res.body

      if (
        !isComponent(Component) ||
        statuses.redirect[res.status] ||
        statuses.empty[res.status] ||
        res.get('Location')
        ) return

      res.set('Content-Type', 'text/html; charset=UTF-8')
      res.body = Component.render(locals)
    })
  }
}

/**
 * Duck types to check for svelte components.
 * TODO: Find a better way to do this.
 *
 * @param {*} Component - The value to check.
 * @return {boolean}
 */
function isComponent (Component) {
  return Boolean(
    Component &&
    Component.render
  )
}
