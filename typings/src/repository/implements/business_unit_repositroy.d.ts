import { Knex as KnexSchema } from 'knex';
import { IUnitOfWorkRepositroy } from '../i_business_unit_repositroy';
export declare abstract class Business_UnitRepositroy<T extends {
    [key: string]: any;
}> implements IUnitOfWorkRepositroy<T> {
    dbContext: KnexSchema;
    find(): Promise<T[]>;
    get(id: string | number): Promise<T | null>;
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
    delete(id: string | number): Promise<number>;
    deleteCondintion(expression: () => {
        [key: string]: any | KnexSchema.Raw;
    }): Promise<number>;
    exec(sql: KnexSchema.QueryBuilder): Promise<any>;
}
