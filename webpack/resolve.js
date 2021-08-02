/**
 * Developer    :   SongQian
 * Time         :   2019/03/09
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   路径语法糖配置
 */

var path = require("path")

module.exports =  {
  extensions: ['.ts', '.tsx', '.js', ".scss", ".json"],
  alias: {
    '~' : path.join(__dirname, '../', 'src')
  }
}