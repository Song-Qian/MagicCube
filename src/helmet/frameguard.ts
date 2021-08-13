/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置X-Frame-Options标题以帮助您减轻点击劫持攻击。
 */

 import * as helmet from 'helmet'

 export default function(frameguard) : (req, res, next: (err?: Error) => void) => void {
    if (Boolean(frameguard) && typeof frameguard === 'boolean') {
        return helmet.frameguard()
    }
    return helmet.frameguard({ action : frameguard.action || 'SAMEORIGIN' });
 }