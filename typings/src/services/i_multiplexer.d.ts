import express from '@feathersjs/express';
import IDependencyResolver from "../dependency/i_dependency";
export default interface IMultiplexer {
    dependencyContainer: IDependencyResolver;
    CreateServeMultiplexer(configure: any): express.Application;
}
