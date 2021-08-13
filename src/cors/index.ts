/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   设置Cross-Origin-Opener-Policy标题
 */

 import express from 'express'
 import cors from 'cors'
 
 /**
  * Express 报文头的安全保护配置启动项加载
  * @param helmet Http 报文头配置项
  * @param server Express Server 
  */
 export default function(corsOptions : any, server : express.Express) {
     if (Boolean(corsOptions)) {
        const options = typeof corsOptions === 'boolean' ? undefined : corsOptions;
        server.use(cors(options))
     }
 }