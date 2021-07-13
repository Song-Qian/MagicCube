/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Cross-Origin-Embedder-Policy标题设置为require-corp. 有关更多信息
 */

 import helmet from 'helmet'

 export default function() : (req, res, next: (err?: Error) => void) => void {
    return helmet.crossOriginEmbedderPolicy();
 }