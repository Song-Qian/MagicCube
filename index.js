'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/cjs/magic-cube.prod.js')
} else {
  module.exports = require('./lib/cjs/magic-cube.js')
}
