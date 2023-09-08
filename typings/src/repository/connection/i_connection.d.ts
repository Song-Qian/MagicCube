import { Knex as KnexSchema } from 'knex';
export default interface IConnectionFactory {
    createConnection(dbconfig: any): KnexSchema;
}
