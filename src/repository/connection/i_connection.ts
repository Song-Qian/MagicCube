/*
 * @Author: @skysong
 * @Date: 2022-04-17 17:29:43
 * @Description: 数据库隔离设计模块
 * @eMail: onlylove1172559463@vip.qq.com
 */
import { Knex as KnexSchema } from 'knex'

export default interface IConnectionFactory {
    createConnection(dbconfig: any) : KnexSchema;
}