/*
 * @Author: SongQian
 * @Date: 2022-04-23 13:50:08
 * @Description: PG 数据库连接器
 * @eMail: onlylove1172559463@vip.qq.com
 */

import { EventEmitter } from 'events'
import { Knex } from 'knex';
import IConnectionFactory from './i_connection'

export abstract class IPGConnection implements IConnectionFactory {
    abstract  emitter: EventEmitter;
    abstract createConnection(): Knex;
}

export class PGConnection extends IPGConnection {
    emitter: EventEmitter;

    constructor() {
        super();
        this.emitter = new EventEmitter();
    }

    createConnection(): Knex<any, Record<string, any>[]> {
        throw new Error('Method not implemented.')
    }
}