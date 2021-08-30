/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   http 请求加载和分发器
 */

import path from 'path'
// import { Router } from 'express'
import express from 'express'
import Feathers from '@feathersjs/feathers'
import IDependencyResolver from '~/dependency/i_dependency'
import IServiceAsyncResolverModule from '~/dependency/i_service_async_resolver_module'
import IServiceSynchResolverModule from '~/dependency/i_service_synch_resolver_module'
import AsynchronousResolverNinject from '~/dependency/asynchronous_resolver_ninject'
import SynchronousResolverNinject from '~/dependency/synchronous_resolver_ninject'

import { HttpService } from './http_service'
import HttpRestFormatHook from './rest_format_hook'


export type Multiplexer = {
    DependencyResolver(..._modules: IServiceSynchResolverModule[] | IServiceAsyncResolverModule[]) : void,
    AppendDependencyResolver(..._modules: IServiceSynchResolverModule[] | IServiceAsyncResolverModule[]) : void
}

export default {
    _service_mapping : new Map<string, HttpService<any>>(),
    _feathers : null,
    _server : null,
    CreateServeMultiplexer : function(configure) : Multiplexer {
        const me = this;
        const dependency : boolean = configure.get('http.server.dependency') || false;
        let dependencyContainer : IDependencyResolver;
        // let identifierMap : { [key:string] : interfaces.ServiceIdentifier<unknown> };
        // let route = Router({ caseSensitive: false, mergeParams: false, strict: true }) 

        const resolveLoadedModule = function(..._modules) {
            const services = dependencyContainer.GetAnyModels<HttpService<any>>(Symbol.for('design:service'));
            const root : string = configure.get('http.server.base') || "/";
            services.forEach((it: HttpService<any>, _) => {
                let http_net_path = Reflect.getMetadata(Symbol.for('design:request_path'), it);
                let fullPath = path.join(root, http_net_path).replace(/[\\]+/g, '/');
                if (me._service_mapping.has(fullPath)) {
                    throw new Error(`Have two identical request paths: ${fullPath}`);
                }
                me._service_mapping.set(fullPath, it);

                me._feathers.use(fullPath, it)
                let service = me._feathers.service(fullPath);
                let afterHooks = [HttpRestFormatHook, ...(<any>it).afterHooks];
                let beforeHooks = [...(<any>it).beforeHooks];
                let errorHooks = [...(<any>it).errorHooks];
                service.hooks({ after : afterHooks, before : beforeHooks, error : errorHooks });
            })
        }

        return {
            //<T extends { [key:string] : interfaces.ServiceIdentifier<unknown> }>
            DependencyResolver(..._modules: IServiceSynchResolverModule[] | IServiceAsyncResolverModule[]) {
                dependencyContainer = dependency ? new AsynchronousResolverNinject(...(<IServiceAsyncResolverModule[]>_modules)) : new SynchronousResolverNinject(...(<IServiceSynchResolverModule[]>_modules));
                dependencyContainer.on("onLoadedModules", resolveLoadedModule);
            },
            //<T extends { [key:string] : interfaces.ServiceIdentifier<unknown> }>
            AppendDependencyResolver(..._modules: IServiceSynchResolverModule[] | IServiceAsyncResolverModule[]) {
                if(dependencyContainer) {
                    if (dependency) {
                        dependencyContainer.AddAsynchronousModules(...(<IServiceAsyncResolverModule[]>_modules));
                        return;
                    }
                    dependencyContainer.AddSynchronousNinjectModels(...(<IServiceSynchResolverModule[]>_modules));
                }
            }
        };
    },
    Setup: function(server : express.Express, feathers : Feathers.Application) {
        const me = this;
        me._server = server;
        me._feathers = feathers;
    }
}