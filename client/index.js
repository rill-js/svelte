'use strict'

var statuses = require('statuses')
var active = null

/**
 * Creates a Rill middleware that renders a svelte component.
 *
 * @param {object} options - The options for the middleware.
 * @param {string} [options.target='body'] - The target element for rendering svelte.
 * @return {function}
 */
module.exports = function svelteMiddlewareSetup (options) {
  var target = document.querySelector((options && options.target) || 'body')

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
      res.body = ' '

      if (active) {
        // Try updating component if it is the same.
        if (active instanceof Component) return active.set(locals)
        // Otherwise remove it from the dom.
        else active.destroy(true)
      }

      // Insert new component.
      active = new Component({
        target: target,
        hydrate: !active, // Only hydrate initial render.
        data: locals
      })
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
    Component.prototype.destroy
  )
}
