import express from '@feathersjs/express';
import IServiceAsyncResolverModule from "../dependency/i_service_async_resolver_module";
import IServiceSynchResolverModule from "../dependency/i_service_synch_resolver_module";
import { HttpService } from './http_service';
export declare type Multiplexer = {
    DependencyResolvers(..._modules: IServiceSynchResolverModule[] | IServiceAsyncResolverModule[]): void;
    AppendDependencyResolver(..._modules: IServiceSynchResolverModule[] | IServiceAsyncResolverModule[]): void;
};
declare const _default: {
    _service_mapping: Map<string, HttpService<any>>;
    _server: null;
    CreateServeMultiplexer: (configure: any) => Multiplexer;
    Setup: (server: express.Application) => void;
};
export default _default;
