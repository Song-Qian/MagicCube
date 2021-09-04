/// <reference types="node" />
import { EventEmitter } from 'events';
import { Container, interfaces } from 'inversify';
import ServiceAsyncResolverModule from './i_service_async_resolver_module';
import ServiceSynchResolverModule from './i_service_synch_resolver_module';
export default abstract class IDependencyResolver {
    protected readonly abstract Ikernel: Container;
    protected readonly abstract emitter: EventEmitter;
    abstract AddSynchronousNinjectModels(..._modules: ServiceSynchResolverModule[]): void;
    abstract AddAsynchronousNinjectModules(..._modules: ServiceAsyncResolverModule[]): void;
    abstract clearAllNinjectModules(): void;
    abstract clearNinjectModules(..._modules: ServiceSynchResolverModule[] | ServiceAsyncResolverModule[]): void;
    abstract GetService<HttpService>(serviceIdentifier: string | number | symbol): HttpService;
    abstract GetServices<HttpService>(serviceIdentifiers: Array<string | number | symbol>): HttpService[];
    abstract GetAnyModel<T>(identifier: interfaces.ServiceIdentifier<any>): T;
    abstract GetAnyModels<T>(identifiers: interfaces.ServiceIdentifier<any>): T[];
    abstract useMiddleware(...middleware: interfaces.Middleware[]): void;
    abstract on(eventName: string, fn: (...args: any[]) => void): any;
    abstract off(eventName: string, fn: (...args: any[]) => void): any;
    abstract once(eventName: string, fn: (...args: any[]) => void): any;
}
