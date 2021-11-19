import IMultiplexer from "./services/i_multiplexer";
import IServiceSynchResolverModule from './dependency/i_service_synch_resolver_module';
import IServiceAsyncResolverModule from './dependency/i_service_async_resolver_module';
export declare class Cube {
    constructor({ config }: {
        config: any;
    });
    private server;
    private configure;
    private cubeId;
    private name;
    private subServe;
    Run(): void;
    useMultiplexer<T extends IMultiplexer>(multiplexerName: string, multiplexer: abstract new () => T, ...args: any[]): void;
    dependencyResolvers<M extends Array<IServiceSynchResolverModule> | Array<IServiceAsyncResolverModule>>(..._modules: M): void;
}
