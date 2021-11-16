import express from '@feathersjs/express';
export default interface IMultiplexer {
    CreateServeMultiplexer(configure: any): express.Application;
}
