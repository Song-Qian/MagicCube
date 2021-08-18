/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   生产编译处理配置
 */

let path = require("path");

module.exports = function() {

    const JS_Loader = {
        test: /\.(js)$/,
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:[['@babel/preset-env', { targets : { node: 'v14.17.2' } }]]
          }
        }
    }

    const TS_Loader = {
      test : /\.ts(x?)$/,
      loader: 'ts-loader'
      // exclude: /node_modules/
    }

    // const URL_Loaer  = {
    //     test: /\.(png|jpg|jpeg|gif|svg)$/,
    //     loader: 'url-loader',
    //     options: {
    //         limit: 6144,
    //         name: 'assets/images/[name].[ext]?cache=[hash:8]'
    //     }
    // }

    // const cssLoader = {
    //     test: /\.css$/,
    //     use : basicExtract.extract({ fallback : 'css-loader', use : 'css-loader'})
    // }

    // const sassLoader = {
    //     test: /\.(sass|scss)$/,
    //     use : skinExtract.extract({ fallback: 'css-loader!sass-loader', use : 'css-loader!sass-loader' })
    // }

    // const jsonLoader = {
    //     test: /\.json$/,
    //     loader: 'file-loader',
    //     options: {
    //         name: 'assets/data/[hash:8].[name].json'
    //     }
    // }

    // const fileLoader = {
    //     test: /\.(eot|svg|ttf|woff|woff2)$/,
    //     loader: 'file-loader',
    //     options: {
    //       name: 'assets/Css/font/[name].[ext]'
    //     }
    // }

    return [
      JS_Loader,
      TS_Loader
      // URL_Loaer,
      // cssLoader,
      // sassLoader,
      // jsonLoader,
      // fileLoader
    ]
}