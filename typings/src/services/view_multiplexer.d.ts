import express from '@feathersjs/express';
import IViewMultiplexer from './i_view_multiplexer';
export default class ViewMultiplexer extends IViewMultiplexer {
    constructor(template: string, render: {
        kind: string;
        render: (...args: any[]) => void;
    });
    private templatePath;
    CreateServeMultiplexer(configure: any): express.Application;
}
