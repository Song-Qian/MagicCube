import express from '@feathersjs/express';
import IRestMultiplexer from './i_rest_multiplexer';
export default class RestMultiplexer extends IRestMultiplexer {
    constructor();
    CreateServeMultiplexer(configure: any): express.Application;
}
