/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置Strict-Transport-Security标头，它告诉浏览器更喜欢 HTTPS 而不是不安全的 HTTP
 */

 import * as helmet from 'helmet'

 export default function(hsts) : (req, res, next: (err?: Error) => void) => void {
    if (Boolean(hsts) && typeof hsts === 'boolean') {
        return helmet.hsts();
    }

    return helmet.hsts({ maxAge : Number(hsts.maxAge) || 15552000, includeSubDomains: hsts.includeSubDomains || false, preload: hsts.preload || false });
 }