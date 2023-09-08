/// <reference types="node" />
import { Container, interfaces } from 'inversify';
import IDependencyResolver from './i_dependency';
import ServiceAsyncResolverModule from './i_service_async_resolver_module';
import ServiceSynchResolverModule from './i_service_synch_resolver_module';
import { EventEmitter } from 'events';
export default class DependencyResolver extends IDependencyResolver {
    constructor();
    protected Ikernel: Container;
    protected emitter: EventEmitter;
    AddSynchronousNinjectModels(..._modules: Array<ServiceSynchResolverModule>): void;
    AddAsynchronousNinjectModules(..._modules: Array<ServiceAsyncResolverModule>): void;
    dispatchNinjectModules(..._modules: Array<ServiceSynchResolverModule> | Array<ServiceAsyncResolverModule>): void;
    clearAllNinjectModules(): void;
    clearNinjectModules(..._modules: Array<ServiceSynchResolverModule> | Array<ServiceAsyncResolverModule>): void;
    GetService<T>(serviceIdentifier: interfaces.ServiceIdentifier<any>, named: string | number | symbol): T;
    GetServices<T>(serviceIdentifier: interfaces.ServiceIdentifier<any>, names: Array<string | number | symbol>): T[];
    GetAnyModel<T>(identifier: interfaces.ServiceIdentifier<any>): T;
    GetAnyModels<T>(identifiers: interfaces.ServiceIdentifier<any>): T[];
    useMiddleware(...middleware: Array<interfaces.Middleware>): void;
    on(eventName: string, fn: (...args: Array<any>) => void): void;
    off(eventName: string, fn: (...args: Array<any>) => void): void;
    once(eventName: string, fn: (...args: Array<any>) => void): void;
}
