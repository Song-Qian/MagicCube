import express from '@feathersjs/express';
import IMultiplexer from './i_multiplexer';
import Container from './container';
import { FileService } from './file_service';
export default abstract class IFileMultiplexer implements IMultiplexer {
    protected _service_mapping: Container<FileService>;
    abstract CreateServeMultiplexer(configure: any): express.Application;
}
