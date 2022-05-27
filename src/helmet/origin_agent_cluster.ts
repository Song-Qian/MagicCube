/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置Origin-Agent-Cluster标头，它提供了一种允许 Web 应用程序隔离其源的机制
 */

 import * as helmet from 'helmet'

 export default function() : (req, res, next: (err?: Error) => void) => void {
    return helmet.originAgentCluster()
 }