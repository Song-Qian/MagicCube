import { interfaces } from "inversify";
import { inTypes } from "~/utils/common";
import AsynchronousResolverNinject from "./asynchronous_resolver_ninject";
import IDependencyResolver from "./i_dependency";
import IServiceAsyncResolverModule from "./i_service_async_resolver_module";
import IServiceSynchResolverModule from "./i_service_synch_resolver_module";
import SynchronousResolverNinject from "./synchronous_resolver_ninject";

export default class ResolverModuleFactory<M extends IServiceSynchResolverModule | IServiceAsyncResolverModule> {
    
    constructor(..._modules: Array<M>) {
        this.dependencyContainer =  inTypes<Array<IServiceSynchResolverModule | IServiceAsyncResolverModule>, IServiceSynchResolverModule>(_modules) ? new SynchronousResolverNinject() : new AsynchronousResolverNinject();
    }

    private readonly dependencyContainer !: IDependencyResolver;

    private static instance : ResolverModuleFactory<IServiceSynchResolverModule | IServiceAsyncResolverModule>;

    public static getInstance<M extends Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>>(..._modules: M) {
        if (!ResolverModuleFactory.instance) {
            ResolverModuleFactory.instance = new ResolverModuleFactory(..._modules);
            Object.freeze(ResolverModuleFactory.instance);
        }
        return ResolverModuleFactory.instance;
    }

    public AddSynchronousNinjectModels (..._modules: Array<IServiceSynchResolverModule>): void {
        this.dependencyContainer.AddSynchronousNinjectModels(..._modules);
    }

    public AddAsynchronousNinjectModules (..._modules: Array<IServiceAsyncResolverModule>): void {
        this.dependencyContainer.AddAsynchronousNinjectModules(..._modules);
    }

    public dispatchNinjectModules(..._modules: Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>) : void {
        this.dependencyContainer.dispatchNinjectModules(..._modules);
    }

    public clearAllNinjectModules (): void {
        this.dependencyContainer.AddAsynchronousNinjectModules();
    }

    public clearNinjectModules (..._modules: Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>): void {
        this.dependencyContainer.clearNinjectModules(..._modules);
    }

    public GetService<T> (serviceIdentifier: interfaces.ServiceIdentifier<any>, named: string | number | symbol) : T {
        return this.dependencyContainer.GetService<T>(serviceIdentifier, named);
    }

    public GetServices<T> (serviceIdentifier: interfaces.ServiceIdentifier<any>, names : Array<string | number | symbol>): T[] {
        return this.dependencyContainer.GetServices<T>(serviceIdentifier, names);
    }

    public GetAnyModel<T> (identifier : interfaces.ServiceIdentifier<any>) : T {
        return this.dependencyContainer.GetAnyModel<T>(identifier);
    }

    public GetAnyModels<T> (identifiers : interfaces.ServiceIdentifier<any>) : T[] {
        return this.dependencyContainer.GetAnyModels<T>(identifiers);
    }

    public useMiddleware (...middleware : Array<interfaces.Middleware>) : void {
        this.dependencyContainer.useMiddleware(...middleware);
    }

    public on(eventName: string, fn : (...args: Array<any>) => void) {
        this.dependencyContainer.on(eventName, fn);
    }

    public off(eventName: string, fn : (...args: Array<any>) => void) {
        this.dependencyContainer.off(eventName, fn);
    }

    public once(eventName: string, fn : (...args: Array<any>) => void) {
        this.dependencyContainer.once(eventName, fn);
    }
}