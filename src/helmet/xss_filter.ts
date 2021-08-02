/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   通过将X-XSS-Protection标头设置为0
 */

 import * as helmet from 'helmet'

 export default function() : (req, res, next: (err?: Error) => void) => void {
    return helmet.xssFilter();
 }