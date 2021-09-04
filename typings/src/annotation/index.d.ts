import 'reflect-metadata';
import { Hook } from '@feathersjs/feathers';
export declare const ApiController: (value: any) => ClassDecorator;
export declare const beforeHook: (fn: Hook) => ClassDecorator | MethodDecorator;
export declare const afterHook: (fn: Hook) => ClassDecorator | MethodDecorator;
export declare const errorHook: (fn: Hook) => ClassDecorator | MethodDecorator;
