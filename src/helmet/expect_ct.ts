/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置Expect-CT有助于缓解错误颁发的 SSL 证书的标头
 */

 import * as helmet from 'helmet'

 export default function(ec) : (req, res, next: (err?: Error) => void) => void {
    if (Boolean(ec) && typeof ec === 'boolean') {
        return helmet.expectCt()
    }

    return helmet.expectCt({ maxAge : Number(ec.maxAge) || 86400, enforce : ec.enforce || false, reportUri : ec.reportUri || "" });
 }