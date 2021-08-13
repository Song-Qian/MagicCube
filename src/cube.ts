/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Magic Cube
 */

import express from 'express'
import helmet from './helmet'
import cors from './cors'
import compress from 'compression'
import logger from './utils/logger'

export class Cube {

    constructor() {
        this.server = express();
    }

    private server !: express.Express;
    private configure !: any;

    public setConfig(config): void {
        this.configure = config;
    }

    public Run(): void {
        const me = this;
        let local = String(me.configure.get("http.listener")) || "localhost";
        let port = ~~me.configure.get("http.port") || 8080;
        helmet(me.configure.get("http.helmet"), me.server)
        cors(me.configure.get("http.cors"), me.server)

        me.server.use(compress())
        me.server.use(express.json({ limit : '15mb' }))
        me.server.use(express.urlencoded({ extended : true }))

        me.server.listen(port, local, () => {
            logger.info('magic cube application started on http://%s:%d', local, port)
        })
    }

}