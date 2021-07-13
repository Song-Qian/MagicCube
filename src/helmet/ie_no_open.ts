/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置X-Download-Options特定于 Internet Explorer 8的标头。它会强制保存可能不安全的下载，从而减轻网站上下文中 HTML 的执行。
 */

 import helmet from 'helmet'

 export default function() : (req, res, next: (err?: Error) => void) => void {
    return helmet.ieNoOpen()
 }