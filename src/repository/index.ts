/*
 * @Author: @skysong
 * @LastEditors: @skysong
 * @Date: 2022/05/27 13:09
 * @eMail: onlylove117225594632vip.qq.com
 * @Description: 创建数据库架构工厂。
 */
import ISchema from "./i_schema"
import IMySQLSchema from '~/repository/schema/i_mysql_schema'
import IOracleSchema from '~/repository/schema/i_oracle_schema'
import IPGSchema from '~/repository/schema/i_pg_schema'
import IMSSQLSchema from '~/repository/schema/i_mssql_schema'
import ISqlite3Schema from "./schema/i_sqlite3_schema"

export const CreateDbSchema = (configure: any): ISchema | null => { 
    const client = configure.get("database.client");

    if (client) {
        const CreateMySQLSchema = () : IMySQLSchema => {
            return Reflect.construct(IMySQLSchema, []);
        }

        const CreateOracleSchema = () : IOracleSchema => {
            return Reflect.construct(IOracleSchema, []);
        }

        const CreatePGSchema = () : IPGSchema => {
            return Reflect.construct(IPGSchema, []);
        }

        const CreateSQLiteSchema = () : ISqlite3Schema => {
            return Reflect.construct(ISqlite3Schema, []);
        }

        const CreateMSSQLSchema = () : IMSSQLSchema => {
            return Reflect.construct(IMSSQLSchema, []);
        }

        const factory = {
            "mysql": CreateMySQLSchema,
            "oracle": CreateOracleSchema,
            "postgresql": CreatePGSchema,
            "mssql": CreateMSSQLSchema,
            "sqlite3": CreateSQLiteSchema
        }
        return factory[client]();
    }
    return null;
}