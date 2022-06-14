/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   删除X-Powered-By在某些框架（如 Express）中默认设置的标头
 */

 import * as helmet from 'helmet'

 export default function() : (req, res, next: (err?: Error) => void) => void {
    return helmet.hidePoweredBy()
 }