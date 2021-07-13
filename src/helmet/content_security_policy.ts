/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置Content-Security-Policy有助于减轻跨站点脚本攻击等的标头
 */

import helmet from 'helmet'

export default function(csp) : (req, res, next: (err?: Error) => void) => void {
    if (Boolean(csp) && typeof csp === 'boolean') {
        return helmet.contentSecurityPolicy();
    }
    
    return helmet.contentSecurityPolicy(csp);
}