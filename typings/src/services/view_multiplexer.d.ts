import express from '@feathersjs/express';
import IViewMultiplexer from './i_view_multiplexer';
export default class RestMultiplexer extends IViewMultiplexer {
    constructor(template: string, render: {
        kind: string;
        render: () => void;
    });
    private path;
    CreateServeMultiplexer(configure: any): express.Application;
}
