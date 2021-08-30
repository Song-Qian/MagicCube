/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Magic Cube Main
 */

import express from 'express'
import Feathers from '@feathersjs/feathers'
import helmet from './helmet'
import cors from './cors'
import compress from 'compression'
import logger from './utils/logger'
import { UUID } from './utils/common'
import HttpMultiplexer from './services/http-multiplexer'


export class Cube {

    constructor() {
        this.server = express();
        this.feathers = Feathers();
    }

    private server !: express.Express;
    private feathers !: Feathers.Application;
    private configure !: any;
    private cubeId : string = UUID();
    private name !: string;

    public setConfig(config): void {
        this.configure = config;
    }

    public Run(): void {
        const me = this;
        let local = String(me.configure.get("http.listener")) || "localhost";
        let port = ~~me.configure.get("http.port") || 8080;
        me.name = me.configure.get("http.name");
        helmet(me.configure.get("http.helmet"), me.server)
        cors(me.configure.get("http.cors"), me.server)

        me.server.use(compress())
        me.server.use(express.json({ limit : me.configure.get("http.maxSize") }))
        me.server.use(express.urlencoded({ extended : true, limit : me.configure.get("get.maxSize") }))

        me.server.listen(port, local, () => {
            logger.info('magic cube application started on http://%s:%d', local, port)
        })
    }

    public useHttpMultiplexer(multiplexer : typeof HttpMultiplexer) {
        const me = this;
        multiplexer.Setup(me.server, me.feathers);
    }

}