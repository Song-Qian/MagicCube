import IConnectionFactory from './i_connection'
import { MySqlConnection } from './i_mysql_connection'
import { OracleConnection } from './i_oracle_connection'
import { PGConnection } from './i_pg_connection'
import { Sqlite3Connection } from './i_sqlite3_connection'
import { Knex as KnexSchema } from 'knex'

type ClientName = "MYSQL" | "ORACLE" | "PG" | "SQLITE3"

export default function ConnectionFactory (clientName: ClientName, configure: any, fn : (conn) => void) : KnexSchema {
    let factory =  ({ 
        "MYSQL": () => new MySqlConnection(),
        "ORACLE": () => new OracleConnection(),
        "PG": () => new PGConnection(),
        "SQLITE3": () => new Sqlite3Connection()
    })
    const dbConnection : IConnectionFactory = factory[clientName]();
    (<any>dbConnection)?.emitter.on('$onPoolCreated', fn);
    return dbConnection?.createConnection(configure.get("database"))
}