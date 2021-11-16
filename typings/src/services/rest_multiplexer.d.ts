import IServiceAsyncResolverModule from "../dependency/i_service_async_resolver_module";
import IServiceSynchResolverModule from "../dependency/i_service_synch_resolver_module";
import express from '@feathersjs/express';
import IRestMultiplexer from './i_rest_multiplexer';
export declare type Multiplexer = {
    DependencyResolvers(..._modules: IServiceSynchResolverModule[] | IServiceAsyncResolverModule[]): void;
    AppendDependencyResolver(..._modules: IServiceSynchResolverModule[] | IServiceAsyncResolverModule[]): void;
};
export default class RestMultiplexer extends IRestMultiplexer {
    constructor();
    CreateServeMultiplexer(configure: any): express.Application;
}
