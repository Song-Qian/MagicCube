/// <reference types="node" />
import { EventEmitter } from 'events';
import { Knex as KnexSchema } from 'knex';
import IConnectionFactory from './i_connection';
export declare abstract class IOracleConnection implements IConnectionFactory {
    abstract emitter: EventEmitter;
    abstract createConnection(dbconfig: any): KnexSchema;
}
export declare class OracleConnection extends IOracleConnection {
    emitter: EventEmitter;
    constructor();
    createConnection(dbconfig: any): KnexSchema<any, Record<string, any>[]>;
}
