import { interfaces } from "inversify";
import IServiceAsyncResolverModule from "./i_service_async_resolver_module";
import IServiceSynchResolverModule from "./i_service_synch_resolver_module";
export default class ResolverModuleFactory<M extends IServiceSynchResolverModule | IServiceAsyncResolverModule> {
    constructor(..._modules: Array<M>);
    private readonly dependencyContainer;
    private static instance;
    static getInstance<M extends Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>>(..._modules: M): ResolverModuleFactory<IServiceSynchResolverModule | IServiceAsyncResolverModule>;
    AddSynchronousNinjectModels(..._modules: Array<IServiceSynchResolverModule>): void;
    AddAsynchronousNinjectModules(..._modules: Array<IServiceAsyncResolverModule>): void;
    dispatchNinjectModules(..._modules: Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>): void;
    clearAllNinjectModules(): void;
    clearNinjectModules(..._modules: Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>): void;
    GetService<T>(serviceIdentifier: interfaces.ServiceIdentifier<any>, named: string | number | symbol): T;
    GetServices<T>(serviceIdentifier: interfaces.ServiceIdentifier<any>, names: Array<string | number | symbol>): T[];
    GetAnyModel<T>(identifier: interfaces.ServiceIdentifier<any>): T;
    GetAnyModels<T>(identifiers: interfaces.ServiceIdentifier<any>): T[];
    useMiddleware(...middleware: Array<interfaces.Middleware>): void;
    on(eventName: string, fn: (...args: Array<any>) => void): void;
    off(eventName: string, fn: (...args: Array<any>) => void): void;
    once(eventName: string, fn: (...args: Array<any>) => void): void;
}
