/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   生产依赖插件配置
 */
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function() {

    // var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    //     name : ['common', 'app', 'load'],
    //     minChunks : 2
    // });
    // var vueLoader = new vueLoaderPlugin();

    var bannerPlugin = new webpack.BannerPlugin({
        banner : `Developer :   SongQian
Time    :   2020-01-1
eMail   :   onlylove1172559463@vip.qq.com
Description :  基于NodeJS服务端即时通信的SSR技术方案，并且支持ORM业务框架解决方案`,
        raw : false,
        entryOnly : false,
        test : /(\.tsx|js)/,
        exclude : /node_modules/
    });

    // const copyPlugin = new CopyWebpackPlugin({ 
    //     patterns : [
    //         { from :  path.join(__dirname, '../src/assets/images'), to : 'assets/images' }
    //     ]
    // })
        
    var definePlugin = new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: 'development'
        }
    });

    var extensionPlugin = [];

    if(process.env.NODE_ENV === 'production') {

        var definePlugin = new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: 'production'
            }
        });
        // var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     test : /\.(vue|js|ts)$/,
        //     compress: {
        //       warnings: false,
        //       drop_debugger : true,
        //       dead_code : true,    //删除没有引用的代码
        //       sequences : 20,    //使用逗号运算符
        //       conditionals : true,  //优化if条件表达式
        //       booleans : true,     //优化boolean值
        //       drop_console: true   //删除console
        //     },
        //     output : {
        //         beautify : true
        //     }
        // });

        extensionPlugin.push(definePlugin);
    }

    return [
        // commonsChunkPlugin,
        // vueLoader,
        // copyPlugin,
        bannerPlugin,
        ...extensionPlugin
    ]
}