const fs = require('fs')
const path = require('path')
const compile = require('svelte').compile
const html = fs.readFileSync(path.join(__dirname, 'view.html'), 'utf8')

try { fs.mkdirSync(path.join(__dirname, 'build')) } catch (_) {}

// Server build.
fs.writeFileSync(
  path.join(__dirname, 'build/server.js'),
  compile(html, {
    name: 'View',
    format: 'cjs',
    generate: 'ssr'
  }).code
)

// Browser build.
fs.writeFileSync(
  path.join(__dirname, 'build/browser.js'),
  compile(html, {
    name: 'View',
    format: 'cjs',
    generate: 'dom'
  }).code
)
