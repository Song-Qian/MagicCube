import express from '@feathersjs/express';
import IMultiplexer from './i_multiplexer';
import Container from './container';
import { HttpService } from './http_service';
export default abstract class IRestMultiplexer implements IMultiplexer {
    protected _service_mapping: Container<HttpService<(...args: any[]) => {
        [key: string]: any;
    }>>;
    abstract CreateServeMultiplexer(configure: any): express.Application;
}
