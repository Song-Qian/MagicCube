import IConnectionFactory from './i_connection'
import { MySqlConnection } from './i_mysql_connection'
import { OracleConnection } from './i_oracle_connection'
import { PGConnection } from './i_pg_connection'
import { MSSQLConnection } from './i_mssql_connection'
import { Sqlite3Connection } from './i_sqlite3_connection'
import { Knex as KnexSchema } from 'knex'
import { interfaces } from 'inversify'

// type ClientName = "MYSQL" | "ORACLE" | "PG" | "SQLITE3" | "MSSQL"

export default function ConnectionFactory (dbconfig: any, fn ?: (conn) => void)  {
    return (context: interfaces.Context) : KnexSchema => {
        let factory =  ({ 
            "mysql": () => new MySqlConnection(),
            "oracle": () => new OracleConnection(),
            "postgresql": () => new PGConnection(),
            "mssql": () => new MSSQLConnection(),
            "sqlite3": () => new Sqlite3Connection()
        });
        const dbConnection : IConnectionFactory = factory[dbconfig.client]();
        fn && (<any>dbConnection)?.emitter.on('$onPoolCreated', fn);
        return dbConnection?.createConnection(dbconfig);
    }
}