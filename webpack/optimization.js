/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   songqian@wtoe.cn
 * Description  :   提取公共脚本
 */

 const TerserPlugin = require('terser-webpack-plugin');

 module.exports = {
    minimize : process.env.NODE_ENV === 'production',
    minimizer : process.env.NODE_ENV === 'production' ? [
        new TerserPlugin({
            test: /\.(js|ts|tsx)$/i,
            exclude : /[\\/]node_modules[\\/]/, //要排除的文件。
            cache : false,  //启用文件缓存
            parallel : true,  //使用多进程并行运行可提高构建速度。
            sourceMap : false,
            extractComments : false, //启用/禁用提取注释。提取all或some（使用/^\**!|@preserve|@license|@cc_on/iRegExp）注释。
            terserOptions : {
                ecma : true, 
                warnings: false, //传递true以在中返回压缩机警告result.warnings。使用该值可"verbose"获取更详细的警告。
                sourceMap : false, 
                ie8 : false, //-设置true为支持IE8。
                safari10 : true, //通过true此选项可解决循环作用域和中的Safari 10/11错误await
                output: {
                    comments: /@license/i,
                }
            }
        })
    ] : [],
    splitChunks: {
        chunks : 'all',
        minSize : 100,
        minChunks : 1,
        maxAsyncRequests : 5,
        maxInitialRequests : 5,
        name: false,
        // cacheGroups : {
            // 'vue-all' : {
            //     test :  /[\\/]node_modules[\\/](vue|vue\-router|vuex|vue\-resource)[\\/]/i,
            //     name : 'vue-all',
            //     priority : 1
            // },
            // 'vue-tsx' : {
            //     test : /[\\/]node_modules[\\/](vue\-tsx\-support|vue\-property\-decorator|vue\-class\-component)[\\/]/i,
            //     name : 'vue-tsx',
            //     priority : 5
            // },
            // 'util' : {
            //     test : /[\\/]node_modules[\\/](moment|vuex\-router\-sync|element-ui)[\\/]/i,
            //     name : 'util',
            //     priority : 3
            // },
            // 'default' : {
            //     name : 'vendors',
            //     priority : 1
            // }
        // }
    }
}