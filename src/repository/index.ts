/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/05/27 13:09
 * @eMail: onlylove117225594632vip.qq.com
 * @Description: 创建数据库架构工厂。
 */
import ISchema from "./i_schema"
import IMySQLSchema from '~/repository/schema/i_mysql_schema'
import IOracleSchema from '~/repository/schema/i_oracle_schema'
import IPGSchema from '~/repository/schema/i_pg_schema'
import ISqlite3Schema from '~/repository/schema/i_sqlite3_schema'

export const CreateDbSchema = (configure: any): ISchema | null => { 
    const client = configure.get("database.client");

    if (client) {
        const CreateMySQLSchema = () : IMySQLSchema => {
            const it = Reflect.construct(function() {}, [], IMySQLSchema);
            it.Initialize(configure);
            return it;
        }
        const CreateOracleSchema = () : IOracleSchema => {
            const it = Reflect.construct(function() {}, [], IOracleSchema);
            it.Initialize(configure);
            return it;
        }
        const CreatePGSchema = () : IPGSchema => {
            const it = Reflect.construct(function() {}, [], IPGSchema);
            it.Initialize(configure);
            return it;
        }
        const CreateSqlite3Schema = () : ISqlite3Schema => {
            const it = Reflect.construct(function() {}, [], ISqlite3Schema);
            it.Initialize(configure);
            return it;
        }
        const factory = {
            "mysql": CreateMySQLSchema,
            "oracle": CreateOracleSchema,
            "postgresql": CreatePGSchema,
            "sqlite3": CreateSqlite3Schema
        }
        return factory[client]();
    }
    return null;
}