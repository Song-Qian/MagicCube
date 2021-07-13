/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置X-DNS-Prefetch-Control标头以帮助控制 DNS 预取，这可以以牺牲性能为代价来提高用户隐私
 */

 import helmet from 'helmet'

 export default function(dpc) : (req, res, next: (err?: Error) => void) => void {
    if (Boolean(dpc) && typeof dpc === 'boolean') {
        return helmet.dnsPrefetchControl();
    }
    return helmet.dnsPrefetchControl({ allow : dpc.allow || false });
 }