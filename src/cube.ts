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
import IMultiplexer from '~/services/i_multiplexer'
import MultiplexerFactory from '~/services/multiplexer_factroy'
import IServiceSynchResolverModule from '~/dependency/i_service_synch_resolver_module'
import IServiceAsyncResolverModule from '~/dependency/i_service_async_resolver_module'


export class Cube {

    constructor({ config }) {
        const me = this;
        me.server = express(Feathers());
        me.configure = config || configure();
        me.subServe = new Map<Symbol, express.Application>();
    }

    private server !: express.Application;
    private configure !: any;
    private cubeId : string = UUID();
    private name !: string;
    private subServe !: Map<Symbol, express.Application>;

    public Run(): void {
        const me = this;
        let host = String(me.configure.get("http.listener")) || "localhost";
        let port = ~~me.configure.get("http.port") || 8080;
        me.name = me.configure.get("http.name");
        helmet(me.configure.get("http.helmet"), me.server);
        cors(me.configure.get("http.cors"), me.server);

        me.server.use(compress());
        me.server.use(express.json({ limit : me.configure.get("http.maxSize") }));
        me.server.use(express.urlencoded({ extended : true, limit : me.configure.get("get.maxSize") }));

        me.server.use(
            me.configure.get("http.server.staticPrefix"), 
            express.static(
                me.configure.get("http.server.staticDir"), 
                { dotfiles: "ignore", extensions : me.configure.get("http.server.extension") || ['js'] }
            )
        );

        me.server.use(...me.subServe.values());

        me.server.use(express.notFound())
        me.server.use(express.errorHandler({
            logger : (logger as any),
            html : {
                404 : '404',
                500 : '500'
            }
        }))

        me.server.listen({ port, host, path: me.configure.get("http.server.base") }, () => {
            logger.info('magic cube application started on http://%s:%d', host, port)
        })
    }
    
    public useMultiplexer<T extends IMultiplexer>(multiplexerName: string, multiplexer : abstract new() => T, ...args: any[]) {
        const me = this;
        let multiplexerFactory = MultiplexerFactory.Create<T>(multiplexer, ...args);
        let Serve = multiplexerFactory?.CreateServeMultiplexer(me.configure);
        if (Serve) {
            me.subServe.set(Symbol.for(multiplexerName), Serve);
        }
    }

    public dependencyResolvers<M extends Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>>(..._modules : M) {
        const me = this;
        for (let [_, serve] of me.subServe) {
            serve.emit("dependencyResolvers", me.server, ..._modules);
        }
    }

}