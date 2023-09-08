import { Knex as KnexSchema } from 'knex';
import { IRepository } from './i_repository';
export interface IUnitOfWorkRepositroy<T> extends IRepository {
    dbContext: KnexSchema;
    find(): Promise<T[]>;
    get(id: number | string): Promise<T | null>;
    getCondition(t: Readonly<any> | KnexSchema.Raw): Promise<T[]>;
    getConditionForPage(expression: () => {
        [key: string]: any | KnexSchema.Raw;
    }, page: number, limit: number): Promise<T[]>;
    getSingleModelForCondition(t: Readonly<any> | KnexSchema.Raw): Promise<T | null>;
    getCount(columnName: string): Promise<number>;
    getCountForCondinate(expression: () => {
        [key: string]: any | KnexSchema.Raw;
    }, columnName: string): Promise<number>;
    add(model: T): Promise<T | null>;
    addList(models: T[]): Promise<number>;
    modify(model: Readonly<any>): Promise<T | null>;
    modifyCondition(expression: () => {
        [key: string]: any | KnexSchema.Raw;
    }, model: Readonly<any>): Promise<number>;
    delete(id: number | string): Promise<number>;
    deleteCondintion(expression: () => {
        [key: string]: any | KnexSchema.Raw;
    }): Promise<number>;
    exec(sql: KnexSchema.QueryBuilder): Promise<any>;
}
