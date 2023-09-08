/// <reference types="node" />
import { EventEmitter } from 'events';
import { Knex as KnexSchema } from 'knex';
import IConnectionFactory from './i_connection';
export declare abstract class IPGConnection implements IConnectionFactory {
    abstract emitter: EventEmitter;
    abstract createConnection(dbconfig: any): KnexSchema;
}
export declare class PGConnection extends IPGConnection {
    emitter: EventEmitter;
    constructor();
    createConnection(dbconfig: any): KnexSchema<any, Record<string, any>[]>;
}
