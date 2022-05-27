/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置Referrer-Policy该控制什么样的信息中设置头的Referer头
 */

 import * as helmet from 'helmet'

 export default function(rp) : (req, res, next: (err?: Error) => void) => void {
    if (Boolean(rp) && typeof rp === 'boolean') {
        return helmet.referrerPolicy();
    }

    return helmet.referrerPolicy({ policy: rp.policy || "no-referrer" });
 }