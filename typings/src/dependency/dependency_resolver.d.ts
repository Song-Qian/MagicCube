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
    AddSynchronousNinjectModels(..._modules: ServiceSynchResolverModule[]): void;
    AddAsynchronousNinjectModules(..._modules: ServiceAsyncResolverModule[]): void;
    dispatchNinjectModules(isAsync: boolean, ..._modules: ServiceSynchResolverModule[] | ServiceAsyncResolverModule[]): void;
    clearAllNinjectModules(): void;
    clearNinjectModules(..._modules: ServiceSynchResolverModule[] | ServiceAsyncResolverModule[]): void;
    GetService<HttpService>(named: string | number | symbol): HttpService;
    GetServices<HttpService>(names: Array<string | number | symbol>): HttpService[];
    GetAnyModel<T>(identifier: interfaces.ServiceIdentifier<any>): T;
    GetAnyModels<T>(identifiers: interfaces.ServiceIdentifier<any>): T[];
    useMiddleware(...middleware: interfaces.Middleware[]): void;
    on(eventName: string, fn: (...args: any[]) => void): void;
    off(eventName: string, fn: (...args: any[]) => void): void;
    once(eventName: string, fn: (...args: any[]) => void): void;
}
