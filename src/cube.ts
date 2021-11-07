/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Magic Cube Main
 */

import express from '@feathersjs/express'
import Feathers from '@feathersjs/feathers'
import helmet from '~/helmet'
import cors from '~/cors'
import compress from 'compression'
import logger from '~/utils/logger'
import configure from '~/conf'
import { UUID } from '~/utils/common'
import HttpMultiplexer from '~/services/http-multiplexer'


export class Cube {

    constructor({ config }) {
        this.server = express(Feathers());
        const me = this;
        this.configure = config || configure();
        me.name = me.configure.get("http.name");
        helmet(me.configure.get("http.helmet"), me.server);
        cors(me.configure.get("http.cors"), me.server);

        me.server.use(compress());
        me.server.use(express.json({ limit : me.configure.get("http.maxSize") }));
        me.server.use(express.urlencoded({ extended : true, limit : me.configure.get("get.maxSize") }));
    }

    private server !: express.Application;
    private configure !: any;
    private cubeId : string = UUID();
    private name !: string;

    public Run(): void {
        const me = this;
        let host = String(me.configure.get("http.listener")) || "localhost";
        let port = ~~me.configure.get("http.port") || 8080;

        me.server.use("/", express.static(me.configure.get("http.server.staticDir"), { dotfiles: "ignore", extensions : ['js', 'css', 'jpeg', 'png', 'jpg'] }));
        me.server.configure(express.rest(function(req, rsp, next) {
            debugger
            express.rest.formatter(req, rsp, next);
        }));
        
        me.server.use(express.notFound())
        me.server.use(express.errorHandler({
            logger : (logger as any),
            html : {
                404 : '404',
                500 : '505'
            }
        }))

        me.server.listen({ port, host, path: me.configure.get("http.server.base") }, () => {
            logger.info('magic cube application started on http://%s:%d', host, port)
        })
    }

    public useHttpMultiplexer(multiplexer : typeof HttpMultiplexer) {
        const me = this;
        multiplexer.Setup(me.server);
    }

}