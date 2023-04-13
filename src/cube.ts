/*
 * @Author: @skysong
 * @Date: 2023-03-20 14:52:06
 * @LastEditors: @skysong
 * @LastEditTime: 2023-04-13 14:45:45
 * @FilePath: /MagicCube/src/cube.ts
 * @Description:  Magic Cube Main
 * @eMail: onlylove1172559463@vip.qq.com
 */

import express from '@feathersjs/express'
import Feathers from '@feathersjs/feathers'
import helmet from '~/helmet'
import cors from '~/cors'
import compress from 'compression'
import logger from '~/utils/logger'
import configure from '~/conf'
import IMultiplexer from '~/services/i_multiplexer'
import { CreateDbSchema } from '~/repository'
import ISchema from '~/repository/i_schema'
import MultiplexerFactory from '~/services/multiplexer_factroy'
import IServiceSynchResolverModule from '~/dependency/i_service_synch_resolver_module'
import IServiceAsyncResolverModule from '~/dependency/i_service_async_resolver_module'
import ResolverModuleFactory from './dependency/resolver_module_factory'

export class Cube {

    constructor({ config }) {
        const me = this;
        me.server = express(Feathers());
        me.configure = config || configure();
        me.subServe = new Map<Symbol, express.Application>();
        if (me.configure.get("database.client")) { 
            me.schema = CreateDbSchema(me.configure);
            me.schema?.Initialize(me.configure);
        }
    }

    private server !: express.Application;
    private schema !: ISchema | null;
    private name !: string;
    private configure !: any;
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
                { dotfiles: "ignore", index: false, extensions : me.configure.get("http.server.extension") || ['js'] }
            )
        );

        me.server.use(...me.subServe.values());
        me.server.use(express.notFound())
        me.server.use(express.errorHandler({
            logger : (logger as any),
            html : {
                404 : '<h1>magic cube server</h1> \n <h2>no page</h2>',
                500 : '<h1>magic cube server</h1> \n <h3>server error</h3>'
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

    public dependencyResolvers<M extends IServiceSynchResolverModule | IServiceAsyncResolverModule>(..._modules : Array<M>) {
        const me = this;
        for (let [_, serve] of me.subServe) {
            serve.emit("dependencyResolvers", me.server, ..._modules);
        }
        me.schema?.emit("dependencyResolvers", me.server, ..._modules);
        ResolverModuleFactory.getInstance(..._modules).dispatchNinjectModules(..._modules);
    }
}