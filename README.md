<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/svelte [WIP]
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/@rill/svelte">
    <img src="https://img.shields.io/npm/v/@rill/svelte.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@rill/svelte">
    <img src="https://img.shields.io/npm/dm/@rill/svelte.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/rill-js/rill">
    <img src="https://img.shields.io/gitter/room/rill-js/rill.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

Universal [Svelte](http://svelte.technology) rendering middleware for [Rill](https://github.com/rill-js/rill).

# Installation

```console
npm install @rill/svelte
```

# Example

```javascript
import Rill from 'rill'
import page from '@rill/page'
import renderer from '@rill/svelte'
import HomeView from './home.html'

// Create a rill app.
const app = Rill()

// Setup the document template.
app.get(page
  .html({ lang: 'en' })
  .meta({ charset: 'utf8' })
  .title('My Svelte App')
  .meta({ name: 'author', content: 'Dylan Piercey' })
  .meta({ name: 'descripton', content: 'Universal JS is awesome' })
  .link({ rel: 'stylesheet', href: 'index.css' })
  .script({ src: 'index.js', async: true })
)

// Setup svelte middleware.
app.get(renderer())

// Render a Svelte template.
app.get('/home', ({ res, locals }) => {
  // Set locals passed in as data.
  locals.title = '@rill/svelte'
  // Set a svelte component as the body to render it.
  res.body = HomeView
})
```

# Custom Render Target.
@rill/svelte adds the ability to change the svelte `target` element with an option. By default the `document.body` will be the `target` element.

```js
// Use a query selector to set the root element.
app.use(renderer({ target: '#my-element' }))
```

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
