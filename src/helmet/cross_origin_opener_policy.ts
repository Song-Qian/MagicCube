/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置Cross-Origin-Opener-Policy标题
 */

 import * as helmet from 'helmet'

 export default function(coop) : (req, res, next: (err?: Error) => void) => void {
    if (Boolean(coop) && typeof coop === 'boolean') {
        return helmet.crossOriginOpenerPolicy();
    }
    return helmet.crossOriginOpenerPolicy({ policy : coop.policy || "same-origin" });
 }