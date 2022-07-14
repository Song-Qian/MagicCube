/**
 * Developer    :   SongQian
 * Time         :   2021-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Magic Cube 依赖注入容器实现
 */
import { Container, interfaces } from 'inversify'
import { inTypes } from '~/utils/common'
import IDependencyResolver from './i_dependency'
import ServiceAsyncResolverModule from './i_service_async_resolver_module'
import ServiceSynchResolverModule from './i_service_synch_resolver_module'

import { EventEmitter } from 'events'

export default class DependencyResolver extends IDependencyResolver {

    constructor() {
        super();
        this.Ikernel = new Container({ autoBindInjectable: true });
    }
    
    protected Ikernel: Container;
    protected emitter : EventEmitter = new EventEmitter();

    public AddSynchronousNinjectModels (..._modules: Array<ServiceSynchResolverModule>): void {
        this.Ikernel.load(..._modules)
        this.emitter.emit("onLoadedModules", ..._modules);
    }

    public AddAsynchronousNinjectModules (..._modules: Array<ServiceAsyncResolverModule>): void {
        this.Ikernel.loadAsync(..._modules).then(() => {
            this.emitter.emit("onLoadedModules", ..._modules);
        })
    }

    public dispatchNinjectModules(..._modules: Array<ServiceSynchResolverModule> | Array<ServiceAsyncResolverModule>) : void {
        inTypes<Array<ServiceSynchResolverModule | ServiceAsyncResolverModule>, ServiceSynchResolverModule>(_modules) ? 
            this.AddSynchronousNinjectModels(...(<Array<ServiceSynchResolverModule>>_modules)) : 
                this.AddAsynchronousNinjectModules(...(<Array<ServiceAsyncResolverModule>>_modules));
    }

    public clearAllNinjectModules (): void {
        this.Ikernel.unbindAll()
    }

    public clearNinjectModules (..._modules: Array<ServiceSynchResolverModule> | Array<ServiceAsyncResolverModule>): void {
        this.Ikernel.unload(..._modules)
    }
    
    public GetService<T>(serviceIdentifier: interfaces.ServiceIdentifier<any>, named: string | number | symbol): T {
        return this.Ikernel.getNamed<T>(serviceIdentifier, named);
    }

    public GetServices<T>(serviceIdentifier: interfaces.ServiceIdentifier<any>, names : Array<string | number | symbol>): T[] {
        return names.map(it => this.Ikernel.getNamed<T>(serviceIdentifier, it));
    }

    public GetAnyModel<T>(identifier: interfaces.ServiceIdentifier<any>): T {
        return this.Ikernel.get<T>(identifier);
    }

    public GetAnyModels<T>(identifiers: interfaces.ServiceIdentifier<any>): T[] {
        return this.Ikernel.getAll<T>(identifiers);
    }

    public useMiddleware (...middleware : Array<interfaces.Middleware>) {
        this.Ikernel.applyMiddleware(...middleware);
    }

    public on(eventName: string, fn: (...args: Array<any>) => void) {
        this.emitter.on(eventName, fn);
    }

    public off(eventName: string, fn: (...args: Array<any>) => void) {
        this.emitter.off(eventName, fn);
    }

    public once(eventName: string, fn: (...args: Array<any>) => void) {
        this.emitter.once(eventName, fn);
    }

}