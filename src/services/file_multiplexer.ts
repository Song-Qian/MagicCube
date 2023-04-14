/*
 * @Author: @skysong
 * @Date: 2023-03-20 14:52:06
 * @LastEditors: @skysong
 * @LastEditTime: 2023-04-14 15:53:08
 * @FilePath: /MagicCube/src/services/file_multiplexer.ts
 * @Description: file api 请求加载和分发器
 * @eMail: songqian6110@dingtalk.com
 */
import path from 'path'
import express from '@feathersjs/express'
import Feathers from '@feathersjs/feathers'
import Container from './container'
import { Request, Response, NextFunction } from "express"
import IFileMultiplexer from './i_file_multiplexer'
import IServiceSynchResolverModule from '~/dependency/i_service_synch_resolver_module'
import IServiceAsyncResolverModule from '~/dependency/i_service_async_resolver_module'
import ResolverModuleFactory from '~/dependency/resolver_module_factory'
import { FileService } from './file_service'

export default class FileMultiplexer extends IFileMultiplexer {

    constructor() {
        super()
        const me = this;
        me._service_mapping = Container.getInstance<FileService>();
    }

    public CreateServeMultiplexer(configure): express.Application {
        const me = this;
        const Serve = express(Feathers());

        const resolveFileUplaodSetup = (material: FileService) => {
            return (req : Request, res : Response, next: NextFunction) => {
                if (req.headers["magic-uploader-mark-uid"] && req.headers["x-requested-with"] === "XMLHttpRequest") {
                    material.do_upload(req, res)
                    return res.end(next);
                }
    
                if (req.method.toUpperCase() === "GET" || req.headers["magic-downloader-mark-uid"] && req.headers["x-requested-with"] === "XMLHttpRequest") {
                    material.do_download(req, res);
                    return res.end(next);
                }
                return next(new Error("Incorrect file transfer request, confirming that the request meets the FileMultiplexer's predetermined target. The file transfer request requires X-Requested With to be an XML HttpRequest asynchronous request "));
            }
        }

        const resolveLoadedModule = function() {
            const services = ResolverModuleFactory.getInstance().GetAnyModels<FileService>(Symbol.for('magic:transfer'));
            const root : string = configure.get('http.server.base') || "/";
            services.forEach((it: FileService, _) => {
                let http_net_path = Reflect.getMetadata(Symbol.for('magic:file'), it.constructor) || "";
                let fullPath = path.join(root, http_net_path).replace(/[\\]+/g, '/');
                if (me._service_mapping.has(fullPath)) {
                    throw new Error(`Have two identical request paths: ${fullPath}`);
                }
                me._service_mapping.set(fullPath, it);
                Serve.use(fullPath, resolveFileUplaodSetup(it));
            })
        }

        Serve.once("dependencyResolvers", <M extends IServiceSynchResolverModule | IServiceAsyncResolverModule> (app, ..._modules: Array<M>) => {
            ResolverModuleFactory.getInstance(..._modules).on("onLoadedModules", resolveLoadedModule);
        })
        return Serve;
    }
    
}