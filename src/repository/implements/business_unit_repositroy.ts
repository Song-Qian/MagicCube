/**
 * Developer    :   SongQian
 * Time         :   2019-09-18
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   封装数据库共公代码
 */

import { Knex } from 'knex'
import { IUnitOfWorkRepositroy } from '../i_business_unit_repositroy'
import { inject, injectable } from 'inversify'

@injectable()
export abstract class Business_UnitRepositroy<T extends { [key: string]: any }> implements IUnitOfWorkRepositroy<T> {

    @inject(Symbol.for("magic:repositroy")) dbContext !: Knex;

    /**
     * @Author: SongQian
     * @description: 全表检索
     * @return  全表数据
     */ 
    public async find(): Promise<T[]> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await trx.select().from(tableName).on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit()
            return result;
        } catch (e) {
            await trx.rollback()
        }
        return new Array<T>()
    }

    /**
     * @Author: SongQian
     * @description: 主键检索
     * @param {string} 主键值
     * @return {*} 返回主键检索结果
     */    
    public async get(id: string | number): Promise<T | null> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await trx.select().from(tableName).where("id", id).first().on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit()
            return result
        } catch (e) {
            await trx.rollback()
        }
        return null
    }

    /**
     * @Author: SongQian
     * @description: 条件检索
     * @param {Readonly} 检索条件 { [SearchField] : String Value }
     * @return {*} 返回检索的结果
     */    
    public async getCondition(t: Readonly<any> | Knex.Raw): Promise<T[]> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await trx.select().from(tableName).andWhere(t).on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit()
            return result;
        } catch (e) {
            await trx.rollback();
        }
        return new Array<T>();
    }

    /**
     * @Author: SongQian
     * @description: 自定义条件分页检索
     * @param {function} 自定义检索条件 () => { andWhere ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, orWhere ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, whereNot ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>,  orWhereNot ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>,  orderBy ?: [columnName, "asc" | "desc"]}
     * @param {number} 当前页
     * @param {number} 页大小 
     * @return {*} 返回分页检索的结果
     */ 
    public async getConditionForPage(expression: () => { [key: string]: any | Knex.Raw }, page: number, limit: number): Promise<T[]> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let andWhere = expression().andWhere;
            let orWhere = expression().orWhere;
            let WhereNot = expression().WhereNot;
            let orWhereNot = expression().orWhereNot;
            let orderBy = expression().orderBy;
            let queryBuilder = trx.select();
            if (andWhere) {
                queryBuilder = queryBuilder.andWhere(andWhere);
            }

            if (orWhere) {
                queryBuilder = queryBuilder.orWhere(orWhere);
            }

            if (WhereNot) {
                queryBuilder = queryBuilder.whereNot(WhereNot);
            }

            if (orWhereNot) {
                queryBuilder = queryBuilder.orWhereNot(orWhereNot);
            }

            switch (orderBy) {
                case "toSQL" in orderBy:
                    queryBuilder = queryBuilder.orderBy(orderBy);
                    break;
                default:
                    for (let [field, order] of orderBy) {
                        queryBuilder = queryBuilder.orderBy(field, order || 'asc');
                    }
            }

            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await queryBuilder.from(tableName).limit(limit).offset((page - 1) * limit).on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            return result as T[];
        } catch (e) {
            await trx.rollback();
        }
        return new Array<T>();
    }

    /**
     * @Author: SongQian
     * @description: 条件检索单条结果
     * @param {Readonly} 检索条件 { [SearchField] : String Value }
     * @return {*} 返回检索的结果
     */    
    public async getSingleModelForCondition(t : Readonly<any> | Knex.Raw): Promise<T | null> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await trx.select().from(tableName).where(t).first().on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit();
            return result;
        } catch (e) {
            await trx.rollback()
        }
        return null;
    }

    /**
     * @Author: SongQian
     * @description: 计数
     * @param {string} 列名
     * @return {*} 返回列计数值
     */    
    public async getCount(columnName : string): Promise<number> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await trx.count(columnName, { as : "count" }).from(tableName).on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit();
            return Number(result["count"]);
        } catch (e) {
            await trx.rollback();
        }
        return 0;
    }

    /**
     * @Author: SongQian
     * @description: 有条件的计数 () => { andWhere ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, orWhere ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, whereNot ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>,  orWhereNot ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object> }
     * @param {function} 条件
     * @param {string} 列名
     * @return {*} 返回列计数值
     */    
    public async getCountForCondinate(expression: () => { [key: string]: any | Knex.Raw }, columnName : string): Promise<number> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let andWhere = expression().andWhere;
            let orWhere = expression().orWhere;
            let WhereNot = expression().WhereNot;
            let orWhereNot = expression().orWhereNot;
            let queryBuilder = trx.select();
            if (andWhere) {
                queryBuilder = queryBuilder.andWhere(andWhere);
            }

            if (orWhere) {
                queryBuilder = queryBuilder.orWhere(orWhere);
            }

            if (WhereNot) {
                queryBuilder = queryBuilder.whereNot(WhereNot);
            }

            if (orWhereNot) {
                queryBuilder = queryBuilder.orWhereNot(orWhereNot);
            }

            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await queryBuilder.count(columnName, { as : "count" }).from(tableName).on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);;
            await trx.commit();
            return Number(result["count"]);
        } catch (e) {
            await trx.rollback();
        }
        return 0;
    }

    /**
     * @Author: SongQian
     * @description: 新增一列数据
     * @param {T} 模型数据
     * @return {*} 返回新增实列
     */    
    public async add(model: T): Promise<T | null> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await trx.insert(model, ["id"], { includeTriggerModifications: true }).from(tableName).on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit();
            return { ...model, id : result[0]};
        } catch (e) {
            await trx.rollback();
        }
        return null;
    }

    /**
     * @Author: SongQian
     * @description: 批量新增数据
     * @param {T} 模型数据列表
     * @return {*} 返回新增实列数量
     */    
    public async addList(models: T[]): Promise<number> { 
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await trx.insert(models, ["id"], { includeTriggerModifications: true }).from(tableName).on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit();
            return result.length;
        } catch (e) {
            await trx.rollback();
        }
        return 0;
    }

    /**
     * @Author: SongQian
     * @description: 更新数据
     * @param {Readonly} 更新字段
     * @return {*} 返回被修改的实例
     */    
    public async modify(model : Readonly<any>): Promise<T | null> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await trx.update(model).from(tableName).where("id", model.id).on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit();
            if (result > 0 ) {
                return model;
            }
        } catch (e) {
            await trx.rollback();
        }
        return null;
    }

    /**
     * @Author: SongQian
     * @description: 自定义条件修改数据 { andWhere ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, orWhere ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, whereNot ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>,  orWhereNot ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object> }
     * @param {function} 自定义条件
     * @param {Readonly} 更新字段
     * @return {*} 返回被修改的行数
     */
    public async modifyCondition(expression: () => { [key: string]: any | Knex.Raw }, model : Readonly<any>): Promise<number> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let andWhere = expression().andWhere;
            let orWhere = expression().orWhere;
            let WhereNot = expression().WhereNot;
            let orWhereNot = expression().orWhereNot;
            let queryBuilder = trx.update(model).from(tableName);
            if (andWhere) {
                queryBuilder = queryBuilder.andWhere(andWhere);
            }

            if (orWhere) {
                queryBuilder = queryBuilder.orWhere(orWhere);
            }

            if (WhereNot) {
                queryBuilder = queryBuilder.whereNot(WhereNot);
            }

            if (orWhereNot) {
                queryBuilder = queryBuilder.orWhereNot(orWhereNot);
            }
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await queryBuilder.on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit();
            return result;
        } catch (e) {
            await trx.rollback();
        }
        return 0;
    }

    /**
     * @Author: SongQian
     * @description: 永久移除
     * @param {string} 移除数据主键
     * @return {*} 返回影响行数
     */
    public async delete(id: string | number): Promise<number> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await trx.delete().from(tableName).where("id", id).on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit();
            return result;
        } catch (e) {
            await trx.rollback();
        }
        return 0;
    }

    /**
     * @Author: SongQian
     * @description: 自定义条件永久移除 { andWhere ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, orWhere ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, whereNot ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>,  orWhereNot ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object> }
     * @param {function} 自定义条件
     * @return {*} 返回影响行数
     */    
    public async deleteCondintion(expression: () => { [key: string]: any | Knex.Raw }): Promise<number> {
        let trx = await this.dbContext.transaction();
        let tableName = Reflect.getMetadata(Symbol.for("magic:tableName"), this.constructor);
        try {
            let andWhere = expression().andWhere;
            let orWhere = expression().orWhere;
            let WhereNot = expression().WhereNot;
            let orWhereNot = expression().orWhereNot;
            let queryBuilder = trx.delete();
            if (andWhere) {
                queryBuilder = queryBuilder.andWhere(andWhere);
            }

            if (orWhere) {
                queryBuilder = queryBuilder.orWhere(orWhere);
            }

            if (WhereNot) {
                queryBuilder = queryBuilder.whereNot(WhereNot);
            }

            if (orWhereNot) {
                queryBuilder = queryBuilder.orWhereNot(orWhereNot);
            }
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await queryBuilder.from(tableName).on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit();
            return result;
        } catch (e) {
            await trx.rollback();
        }
        return 0;
    }

    /**
     * @LastEditors: SongQian
     * @Author: SongQian
     * @Date: 2022/05/25 15:02
     * @description: 持行自定义Sql脚本
     * @return {*} 返回Sql持行后对应的数据
     */ 
    public async exec(sql: Knex.QueryBuilder): Promise<any> {
        let trx = await this.dbContext.transaction();
        try {
            let beforeExecute = "$beforeExecute" in this ? (this as any).$beforeExecute : () => void 0;
            let executeError = "$executeError" in this ? (this as any).$executeError : () => void 0;
            let afterExecute = "$executeError" in this ? (this as any).$afterExecute : () => void 0;
            let result = await trx.with("table", sql).select("*").from("table").on("query", beforeExecute).on("query-error", executeError).on("query-response", afterExecute);
            await trx.commit();
            return result;
        } catch (e) {
            await trx.rollback();
        }
        return null;
    }
}
