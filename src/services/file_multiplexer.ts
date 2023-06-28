/*
 * @Author: @skysong
 * @Date: 2023-03-20 14:52:06
 * @LastEditors: @skysong
 * @LastEditTime: 2023-06-28 17:23:06
 * @FilePath: /MagicCube/src/services/file_multiplexer.ts
 * @Description: file api 请求加载和分发器
 * @eMail: songqian6110@dingtalk.com
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import bytes from 'bytes'
import express from '@feathersjs/express'
import Feathers from '@feathersjs/feathers'
import Container from './container'
import multer from 'multer'
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
        
        const resolveFileStorage = function(service) {
            const getFilename = service.getFilename || (($0, file, cb) => cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8')));
            const getDestination = service.getDestination || (($0, $1, cb) => cb(null, configure.get('http.server.staticDir') || os.tmpdir()));

            const storage = function() {
                this.getFilename = getFilename;
                this.getDestination = getDestination;
            }

            storage.prototype._handleFile = function _handleFile (req, file, cb) {
                let that = this
                let uid = req.headers['magic-uploader-mark-uid'];
                let detritu = +(req.headers['magic-uploader-detritu']);
                let limit = req.headers['magic-uploader-limit'];
                let md5 = req.headers["magic-uploader-detritu-md5"];
                if (req.method.toUpperCase() === "POST" && uid && req.headers["x-requested-with"] === "XMLHttpRequest") {
                    that.getDestination(req, file, function(err, destination) {
                        if (err) return cb(err);
                        that.getFilename(req, file, function(err, filename) {
                            if (err) return cb(err);
                            let fullPath = path.join(destination, filename);
                            let isExists = fs.existsSync(fullPath);
                            if (!isExists) {
                                let outStream = fs.createWriteStream(fullPath);
                                file.stream.pipe(outStream);
                                outStream.on('error', cb);
                                outStream.on('finish', () => cb(null, { originalname: filename, size: outStream.bytesWritten }));
                                req.res.header("magic-upload-detritu", 0);
                                return;
                            }
                            let mode = fs.statSync(fullPath);
                            let backpoint = Math.floor(mode.size / limit);
                            let start = backpoint == detritu ? detritu : backpoint;
                            if (isExists && backpoint > detritu) {
                                req.res.header("magic-upload-detritu", backpoint);
                                req.res.on("error", cb);
                                req.res.on("finish", () => cb(null, { originalname: filename }));
                                return req.res.end();
                            }
                            if (isExists && md5 && mode.isFile()) {
                                let outStream = fs.createWriteStream(fullPath, { flags: 'a', mode: 0o777, start: start * limit });
                                file.stream.pipe(outStream);
                                outStream.on('error', cb);
                                outStream.on('finish', () => cb(null, { originalname: filename, size: outStream.bytesWritten }));
                                req.res.header("magic-upload-detritu", start);
                                return;
                            }
                            req.res.header("magic-upload-detritu", 0);
                            cb(new Error('上传文件已存在，并且非断点文件续写!'));
                        })
                    })
                }

                if (req.method.toUpperCase() === "GET" && uid && req.headers["x-requested-with"] === "XMLHttpRequest") {
                    service.do_download(req, req.res);
                }
            }
              
            storage.prototype._removeFile = function _removeFile (_, file, cb) {
                var path = file.path
                delete file.destination
                delete file.filename
                delete file.path
                fs.unlink(path, cb)
            }

            return new storage();
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
                let fileStorage = multer({ storage: resolveFileStorage(it), limits: { fieldNameSize: 100, fieldSize: bytes.parse(configure.get('http.maxSize')), fields: Infinity, fileSize: bytes.parse(configure.get('http.maxSize')), files: Infinity } });
                me._service_mapping.set(fullPath, fileStorage);
                const handlerMakeMiddleware = fileStorage.any();
                Serve.use(fullPath, (req, res, next) => {
                    return handlerMakeMiddleware(req, res, (err) => {
                        if (err) return next(err);
                        it.do_upload(req, res);
                        res.end();
                    });
                });
            })
        }

        Serve.once("dependencyResolvers", <M extends IServiceSynchResolverModule | IServiceAsyncResolverModule> (app, ..._modules: Array<M>) => {
            ResolverModuleFactory.getInstance(..._modules).on("onLoadedModules", resolveLoadedModule);
        })
        return Serve;
    }
    
}