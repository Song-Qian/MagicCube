/**
 * Developer  SongQian
 * eMail    : onlylove1172669563@vip.qq.com
 * time     : 2020-01-11
 * Description: SSR客户端代码打包
 */
const path = require('path')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpackConf = require('./webpack.config')

module.exports = merge(webpackConf, {
  entry: {
    'entry-client': path.resolve(__dirname, '../', 'src/views/entry-client')
  },
  output: {
    libraryTarget : 'window',
  },
  // 对 bundle renderer 提供 source map 支持
  //生产时，请将此处的devtool改成false
  devtool: process.env.NODE_ENV === 'production' ? false : "source-map",
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  // externals : nodeExternals({
  //   whitelist: /\.(vue|css|sass|scss)$/
  // }),
  optimization: {
    splitChunks:{
    }
  },
  plugins: [
    // 生成 `vue-ssr-client-manifest.json`
    new VueSSRClientPlugin()
  ]
})