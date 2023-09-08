import express from '@feathersjs/express';
import IFileMultiplexer from './i_file_multiplexer';
export default class FileMultiplexer extends IFileMultiplexer {
    constructor();
    CreateServeMultiplexer(configure: any): express.Application;
}
