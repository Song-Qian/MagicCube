import express from '@feathersjs/express';
import IViewMultiplexer from './i_view_multiplexer';
export default class ViewMultiplexer extends IViewMultiplexer {
    constructor(template: string, render: {
        kind: string;
        callback: (...args: any[]) => void;
    });
    private templatePath;
    private render;
    CreateServeMultiplexer(configure: any): express.Application;
}
