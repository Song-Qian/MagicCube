/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   将X-Content-Type-Options标题设置为nosniff. 这减轻了可能导致安全漏洞的MIME 类型嗅探.
 */

 import helmet from 'helmet'

 export default function() : (req, res, next: (err?: Error) => void) => void {
    return helmet.noSniff();
 }