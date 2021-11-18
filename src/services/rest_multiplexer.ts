/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   rest api 请求加载和分发器
 */

import path from 'path'
import { inTypes } from '~/common/'
import IDependencyResolver from '~/dependency/i_dependency'
import DependencyResolver from '~/dependency/dependency_resolver'
import IServiceAsyncResolverModule from '~/dependency/i_service_async_resolver_module'
import AsynchronousResolverNinject from '~/dependency/asynchronous_resolver_ninject'
import SynchronousResolverNinject from '~/dependency/synchronous_resolver_ninject'

import { HttpService } from './http_service'
import HttpRestFormatHook from './rest_format_hook'
import IServiceSynchResolverModule from '~/dependency/i_service_synch_resolver_module'

import express from '@feathersjs/express'
import Feathers from '@feathersjs/feathers'
import IRestMultiplexer from './i_rest_multiplexer'

export default class RestMultiplexer extends IRestMultiplexer {

    constructor() {
        super()
        const me = this;
        me._service_mapping = new Map<string, HttpService<(...args: any[]) => { [key: string] : any }>>();
    }

    public CreateServeMultiplexer(configure): express.Application {
        const Serve = express(Feathers());
        const me = this;
        Serve.configure(express.rest(function(req, rsp, next) {
            express.rest.formatter(req, rsp, next);
        }));

        const resolveLoadedModule = function() {
            const services = me.dependencyContainer.GetAnyModels<HttpService<(...args: any[]) => { [key: string] : any }>>(Symbol.for('magic:rest'));
            const root : string = configure.get('http.server.base') || "/";
            services.forEach((it: HttpService<(...args: any[]) => { [key: string] : any }>, _) => {
                let http_net_path = Reflect.getMetadata(Symbol.for('magic:api'), it.constructor) || "";
                let fullPath = path.join(root, http_net_path).replace(/[\\]+/g, '/');
                if (me._service_mapping.has(fullPath)) {
                    throw new Error(`Have two identical request paths: ${fullPath}`);
                }
                me._service_mapping.set(fullPath, it);
                Serve.use(fullPath, it);
                let service = Serve.service(fullPath);
                let afterHooks = [HttpRestFormatHook, ...(<any>it).afterHooks];
                let beforeHooks = [...(<any>it).beforeHooks];
                let errorHooks = [...(<any>it).errorHooks];
                service.hooks({ after : afterHooks, before : beforeHooks, error : errorHooks });
            })
        }

        Serve.on("dependencyResolvers", (app) => {
            return <M extends Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>>(..._modules: M) => {
                me.dependencyContainer = inTypes<Array<IServiceSynchResolverModule | IServiceAsyncResolverModule>, IServiceSynchResolverModule>(_modules) ? new SynchronousResolverNinject() : new AsynchronousResolverNinject();
                me.dependencyContainer.on("onLoadedModules", resolveLoadedModule);
                (<DependencyResolver>me.dependencyContainer).dispatchNinjectModules(..._modules);
            }
        })
        return Serve;
    }
    
}