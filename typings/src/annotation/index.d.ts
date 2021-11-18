import 'reflect-metadata';
import { Hook } from '@feathersjs/feathers';
export declare const ApiController: (value: any) => ClassDecorator;
export declare const FileMultiplexer: () => ClassDecorator;
export declare const RestMultiplexer: () => ClassDecorator;
export declare const ViewMultiplexer: () => ClassDecorator;
export declare const beforeHook: (fn: Hook) => ClassDecorator | MethodDecorator;
export declare const afterHook: (fn: Hook) => ClassDecorator | MethodDecorator;
export declare const errorHook: (fn: Hook) => ClassDecorator | MethodDecorator;
