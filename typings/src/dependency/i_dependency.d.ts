/// <reference types="node" />
import { EventEmitter } from 'events';
import { Container, interfaces } from 'inversify';
import IServiceAsyncResolverModule from './i_service_async_resolver_module';
import IServiceSynchResolverModule from './i_service_synch_resolver_module';
export default abstract class IDependencyResolver {
    protected readonly abstract Ikernel: Container;
    protected readonly abstract emitter: EventEmitter;
    abstract AddSynchronousNinjectModels(..._modules: Array<IServiceSynchResolverModule>): void;
    abstract AddAsynchronousNinjectModules(..._modules: Array<IServiceAsyncResolverModule>): void;
    abstract dispatchNinjectModules(..._modules: Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>): void;
    abstract clearAllNinjectModules(): void;
    abstract clearNinjectModules(..._modules: Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>): void;
    abstract GetService<T>(serviceIdentifier: interfaces.ServiceIdentifier<any>, named: string | number | symbol): T;
    abstract GetServices<T>(serviceIdentifier: interfaces.ServiceIdentifier<any>, names: Array<string | number | symbol>): T[];
    abstract GetAnyModel<T>(identifier: interfaces.ServiceIdentifier<any>): T;
    abstract GetAnyModels<T>(identifiers: interfaces.ServiceIdentifier<any>): T[];
    abstract useMiddleware(...middleware: interfaces.Middleware[]): void;
    abstract on(eventName: string, fn: (...args: any[]) => void): any;
    abstract off(eventName: string, fn: (...args: any[]) => void): any;
    abstract once(eventName: string, fn: (...args: any[]) => void): any;
}
