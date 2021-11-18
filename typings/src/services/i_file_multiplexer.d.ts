import express from '@feathersjs/express';
import IMultiplexer from './i_multiplexer';
import { HttpService } from './http_service';
import IDependencyResolver from "../dependency/i_dependency";
export default abstract class IFileMultiplexer implements IMultiplexer {
    dependencyContainer: IDependencyResolver;
    protected _service_mapping: Map<string, HttpService<(...args: any[]) => {
        [key: string]: any;
    }>>;
    abstract CreateServeMultiplexer(configure: any): express.Application;
}
