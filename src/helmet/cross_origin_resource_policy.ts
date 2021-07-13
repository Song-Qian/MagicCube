/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置Cross-Origin-Resource-Policy标题
 */

 import helmet from 'helmet'

 export default function(corp) : (req, res, next: (err?: Error) => void) => void {
    if (Boolean(corp) && typeof corp === 'boolean') {
        return helmet.crossOriginResourcePolicy()
    }
    return helmet.crossOriginResourcePolicy({ policy : corp.policy || "same-site" });
 }