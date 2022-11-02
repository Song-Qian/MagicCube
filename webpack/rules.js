/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/11 06:19
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 生产编译处理配置
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

    const Oracle_Loader = {
      test: /oracledb\.js$/i,
      loader: 'string-replace-loader',
      options: {
        search: 'requireBinary(binaryLocations[i])',
        replace: "import(process.env.ORACLE_PATH + nodbUtil.BINARY_FILE)"
      }
    }

    const HTML_Loader = {
      test: /\.html$/,
      loader: "html-loader",
    }

    return [
      JS_Loader,
      TS_Loader,
      HTML_Loader,
      Oracle_Loader
    ]
}