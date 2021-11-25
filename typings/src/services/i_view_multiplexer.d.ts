import express from '@feathersjs/express';
import IMultiplexer from './i_multiplexer';
import IDependencyResolver from "../dependency/i_dependency";
export default abstract class IViewMultiplexer implements IMultiplexer {
    dependencyContainer: IDependencyResolver;
    protected _service_mapping: Map<string, Function>;
    abstract CreateServeMultiplexer(configure: any): express.Application;
}
