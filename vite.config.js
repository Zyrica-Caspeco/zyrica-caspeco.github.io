// set vite config root to client folder and set port to 1337
const { defineConfig } = require('vite')
module.exports = defineConfig({ root: './client', server: { port: 1337 } })