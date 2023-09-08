import { Knex as KnexSchema } from 'knex';
import { interfaces } from 'inversify';
export default function ConnectionFactory(dbconfig: any, fn?: (conn: any) => void): (context: interfaces.Context) => KnexSchema;
