import express from '@feathersjs/express';
import IViewMultiplexer from './i_view_multiplexer';
export default class RestMultiplexer extends IViewMultiplexer {
    constructor();
    CreateServeMultiplexer(configure: any): express.Application;
}