/**
 * Developer  SongQian
 * eMail    : onlylove1172669563@vip.qq.com
 * time     : 2020-01-11
 * Description: VUE SSR服务端代码打包
 */
const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const webpackConf = require('./webpack.config')

module.exports = merge(webpackConf, {
  entry: {
    'entry-service': path.resolve(__dirname, '../', 'src/views/entry-service')
  },
  output: {
    libraryTarget : 'commonjs2',
  },
  //运行目标平台
  target : 'node',
  // 对 bundle renderer 提供 source map 支持
  //生产时，请将此处的devtool改成false
  // devtool: process.env.NODE_ENV === 'production' ? false : "source-map",
  devtool: process.env.NODE_ENV === 'production' ? false : "source-map",
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  externals : nodeExternals({
    whitelist: /\.(css|sass|scss)$/
  }),
  // 构建为单个 JSON 文件的插件。
  plugins : [
    // 默认文件名为 `vue-ssr-server-bundle.json`
    new VueSSRServerPlugin(),
  ]
})