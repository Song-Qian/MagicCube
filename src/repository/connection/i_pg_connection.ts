/*
 * @Author: @skysong
 * @Date: 2022-04-23 13:50:08
 * @Description: PG 数据库连接器
 * @eMail: onlylove1172559463@vip.qq.com
 */

import { EventEmitter } from 'events'
import knex, { Knex as KnexSchema } from 'knex';
import IConnectionFactory from './i_connection'
import logger from '~/utils/logger'

export abstract class IPGConnection implements IConnectionFactory {
    abstract  emitter: EventEmitter;
    abstract createConnection(dbconfig: any): KnexSchema;
}

export class PGConnection extends IPGConnection {
    emitter: EventEmitter;

    constructor() {
        super();
        this.emitter = new EventEmitter();
    }

    public createConnection(dbconfig: any): KnexSchema<any, Record<string, any>[]> {
        return knex({
            client: "pg",
            connection: {
                host: dbconfig.connection.host,
                port: Number(dbconfig.connection.port) || 5432,
                user: dbconfig.connection.user,
                password: dbconfig.connection.password,
                database: dbconfig.connection.database,
                connectionTimeoutMillis: Number(dbconfig.connection.timeout)
            },
            pool: {
                min: Number(dbconfig.pool.min),
                max: Number(dbconfig.pool.max),
                afterCreate: (conn, done) => { 
                    try { 
                        this.emitter.emit("$onPoolCreated", conn);
                        done(null, conn);
                    } catch (e) {
                        done(e, conn)
                    }
                }
            },
            searchPath: ['public', '$user', 'public'],
            postProcessResponse: (result: any) => result,
            wrapIdentifier: (value, origImpl, queryContext) => origImpl(value.toLowerCase()),
            log: dbconfig.logger ? logger : undefined
        })
    }
}