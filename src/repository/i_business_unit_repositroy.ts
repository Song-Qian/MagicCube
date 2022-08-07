/*
 * @Author: SongQian
 * @Date: 2022-04-17 17:29:43
 * @Description: 数据库粒度单位业务表
 * @eMail: onlylove1172559463@vip.qq.com
 */
import { Knex as KnexSchema } from 'knex'
import { IRepository } from './i_repository'

export interface IUnitOfWorkRepositroy<T> extends IRepository {

    dbContext : KnexSchema;
    /**
     * @Author: SongQian
     * @description: 全表检索
     * @return  全表数据
     */    
    find (): Promise<T[]>

    /**
     * @Author: SongQian
     * @description: 主键检索
     * @param {string} 主键值
     * @return {*} 返回主键检索结果
     */    
    get (id: number | string): Promise<T | null>

    /**
     * @Author: SongQian
     * @description: 条件检索
     * @param {Readonly} 检索条件 { [SearchField] : String Value }
     * @return {*} 返回检索的结果
     */    
    getCondition (t : Readonly<any> | KnexSchema.Raw): Promise<T[]>

    
    /**
     * @Author: SongQian
     * @description: 自定义条件分页检索
     * @param {function} 自定义检索条件 () => { andWhere ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, orWhere ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, whereNot ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>,  orWhereNot ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>,  orderBy ?: [columnName, "asc" | "desc"]}
     * @param {number} 当前页
     * @param {number} 页大小 
     * @return {*} 返回分页检索的结果
     */ 
    getConditionForPage (expression: () => { [key: string]: any | KnexSchema.Raw }, page: number, limit: number): Promise<T[]>

    /**
     * @Author: SongQian
     * @description: 条件检索单条结果
     * @param {Readonly} 检索条件 { [SearchField] : String Value }
     * @return {*} 返回检索的结果
     */    
    getSingleModelForCondition (t : Readonly<any> | KnexSchema.Raw): Promise<T | null>

    /**
     * @Author: SongQian
     * @description: 计数
     * @param {string} 列名
     * @return {*} 近回列计数值
     */    
    getCount (columnName : string): Promise<number>

    /**
     * @Author: SongQian
     * @description: 有条件的计数 () => { andWhere ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, orWhere ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, whereNot ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>,  orWhereNot ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object> }
     * @param {function} 条件
     * @param {string} 列名
     * @return {*} 返回列计数值
     */    
    getCountForCondinate (expression: () => { [key: string]: any | KnexSchema.Raw }, columnName : string): Promise<number>

    /**
     * @Author: SongQian
     * @description: 新增一列数据
     * @param {T} 模型数据
     * @return {*} 返回新增实列
     */    
    add (model: T): Promise<T | null>

    /**
     * @Author: SongQian
     * @description: 批量新增数据
     * @param {T} 模型数据列表
     * @return {*} 返回新增实列数量
     */    
    addList (models: T[]): Promise<number>

    /**
     * @Author: SongQian
     * @description: 更新数据
     * @param {Readonly} 更新字段
     * @return {*} 返回被修改的实例
     */    
    modify (model : Readonly<any>): Promise<T | null>

    /**
     * @Author: SongQian
     * @description: 自定义条件修改数据 { andWhere ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, orWhere ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>, whereNot ?: Knex.Raw<any> | Knex.QueryCallback | Readonly<Object>,  orWhereNot ?:  Knex.Raw<any> | Knex.QueryCallback | Readonly<Object> }
     * @param {function} 自定义条件
     * @param {Readonly} 更新字段
     * @return {*} 返回被修改的行数
     */    
    modifyCondition (expression: () => { [key: string]: any | KnexSchema.Raw }, model : Readonly<any>): Promise<number>

    /**
     * @Author: SongQian
     * @description: 永久移除
     * @param {string} 移除数据主键
     * @return {*} 返回影响行数
     */
    delete (id: number | string): Promise<number>

    /**
     * @Author: SongQian
     * @description: 自定义条件永久移除
     * @param {function} 自定义条件
     * @return {*} 返回影响行数
     */   
    deleteCondintion (expression: () => { [key: string]: any | KnexSchema.Raw }): Promise<number>

    /**
     * @LastEditors: SongQian
     * @Author: SongQian
     * @Date: 2022/05/25 15:02
     * @description: 持行自定义Sql脚本
     * @return {*} 返回Sql持行后对应的数据
     */    
    exec (sql: KnexSchema.QueryBuilder) : Promise<any>

}
