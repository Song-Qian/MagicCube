/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置X-Permitted-Cross-Domain-Policies标头，它告诉一些客户（主要是 Adob​​e 产品）您的域加载跨域内容的策略
 */

 import * as helmet from 'helmet'

 export default function(pcdp) : (req, res, next: (err?: Error) => void) => void {
    if (Boolean(pcdp) && typeof pcdp === 'boolean') {
        return helmet.permittedCrossDomainPolicies()
    }
    return helmet.permittedCrossDomainPolicies({ permittedPolicies : pcdp.permittedPolicies || 'none' });
 }