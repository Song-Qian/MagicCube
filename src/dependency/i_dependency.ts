/**
 * Developer    :   SongQian
 * Time         :   2021-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Magic Cube 依赖注入容器
 */

import { EventEmitter } from 'events';
import { Container, interfaces } from 'inversify'
import ServiceAsyncResolverModule from './i_service_async_resolver_module'
import ServiceSynchResolverModule from './i_service_synch_resolver_module'
import { HttpService } from '../services/http_service'

export default abstract class IDependencyResolver {

    protected readonly abstract Ikernel : Container;

    protected readonly abstract emitter : EventEmitter;

    public abstract AddSynchronousNinjectModels (..._modules: ServiceSynchResolverModule[]): void;

    public abstract AddAsynchronousNinjectModules (..._modules: ServiceAsyncResolverModule[]): void;

    public abstract clearAllNinjectModules (): void;

    public abstract clearNinjectModules (..._modules: ServiceSynchResolverModule[] | ServiceAsyncResolverModule[]): void;

    public abstract GetService<T> (serviceIdentifier: interfaces.ServiceIdentifier<any>, named: string | number | symbol) : T;

    public abstract GetServices<T> (serviceIdentifier: interfaces.ServiceIdentifier<any>, names : Array<string | number | symbol>): T[];

    public abstract GetAnyModel<T> (identifier : interfaces.ServiceIdentifier<any>) : T;

    public abstract GetAnyModels<T> (identifiers : interfaces.ServiceIdentifier<any>) : T[];

    public abstract useMiddleware (...middleware : interfaces.Middleware[]) : void;

    public abstract on(eventName: string, fn : (...args: any[]) => void);

    public abstract off(eventName: string, fn : (...args: any[]) => void);

    public abstract once(eventName: string, fn : (...args: any[]) => void);

}