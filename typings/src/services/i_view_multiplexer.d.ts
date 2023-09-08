import express from '@feathersjs/express';
import IMultiplexer from './i_multiplexer';
import Container from './container';
export default abstract class IViewMultiplexer implements IMultiplexer {
    protected _service_mapping: Container<any>;
    abstract CreateServeMultiplexer(configure: any): express.Application;
}
