/**
 * Developer  SongQian
 * eMail    : onlylove1172669563@vip.qq.com
 * time     : 2020-01-11
 * Description: VUE SSR服务端渲染代码打包
 */
const { merge } = require('webpack-merge')
const entry = require("./entry")
const output = require("./output")
const rules = require("./rules")
const resolve = require("./resolve")
const externals = require("./externals")
const plugins = require("./plugins")
const optimization = require('./optimization')

module.exports = merge({}, {
  entry,
  output,
  resolve,
  optimization,
  plugins: [
    ...plugins()
  ],
  module: {
    rules: [
      ...rules()
    ]
  },
  externals,
  performance: {
    hints: process.env.NODE_ENV === 'production' ? false : 'warning'
  }
})