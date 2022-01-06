/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   生产编译处理配置
 */

 const tsTransformPaths = require('@zerollup/ts-transform-paths');

module.exports = function() {

    const JS_Loader = {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:[['@babel/preset-env', { targets : { node: "current" } }]]
          }
        }
    }

    const TS_Loader = {
      test : /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        getCustomTransformers: (program) => {
          const transformer = tsTransformPaths(program);
          return {
            before: [transformer.before],
            afterDeclarations: [transformer.afterDeclarations]
          };
        }
      }
    }

    return [
      JS_Loader,
      TS_Loader
    ]
}