/**
 * Developer  SongQian
 * eMail    : onlylove1172669563@vip.qq.com
 * time     : 2020-01-11
 * Description: NodeJS 运行环境代码打包
 */
const path = require('path')
const { merge } = require('webpack-merge')
// const nodeExternals = require('webpack-node-externals')
const webpackConf = require('./webpack.config')

module.exports = merge(webpackConf, {
  entry: {
    'index': path.resolve(__dirname, '../', 'src/index')
  },
  output: {
    libraryTarget : 'commonjs2'
  },
  //运行目标平台
  target : 'node',
  // 对 bundle renderer 提供 source map 支持
  //生产时，请将此处的devtool改成false
  // devtool: process.env.NODE_ENV === 'production' ? false : "source-map",
  devtool: process.env.NODE_ENV === 'production' ? false : "source-map",
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  // externals : nodeExternals(),
  // 构建为单个 JSON 文件的插件。
  plugins : [
  ]
})