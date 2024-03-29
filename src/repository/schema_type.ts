/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/05/25 16:37
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 数据库类型推断
 */
import { Knex as KnexSchema } from "knex"

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/25 16:50
 * @description: 数据库表字段数据类型枚举
 * @return {*}
 */
export enum TableColumnEnum {
    Integer  = 0,
    BigInteger = 1,
    Text = 2,
    String = 3,
    Float = 4,
    Double = 5,
    Decimal = 6,
    Boolean = 7,
    Date = 8,
    DateTime = 9,
    Time = 10,
    Timestamp = 11,
    Binary = 12,
    Enum = 13,
    Json = 14,
    Jsonb = 15,
    UUID = 16,
    Geometry = 17,
    Geography = 18,
    Point = 19
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 13:10
 * @description: 表索引
 * @return {*}
 */
export type TableIndex = {
    indexType ?:  "FULLTEXT" | "SPATIAL"
    storageEngineIndexType ?: "btree" | "hash"
    predicate?: KnexSchema.QueryBuilder
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 13:11
 * @description: 表唯一索引
 * @return {*}
 */
export type UniqueIndex = {
    indexName: string
    deferrable: 'not deferrable' | 'immediate' | 'deferred',
    storageEngineIndexType: "btree" | "hash",
    useConstraint: boolean
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 13:11
 * @description: 表主键
 * @return {*}
 */
export type PrimaryKey = {
    constraintName : string
    deferrable?: 'not deferrable' | 'immediate' | 'deferred'
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 13:11
 * @description: 表默认值
 * @return {*}
 */
export type DefaultValue = string | number | boolean | null | Date | Array<string> | Array<number> | Array<Date> | Array<boolean> | Buffer;

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/06/01 14:05
 * @description: 表字段发生修改时的状态
 * @return {*}
 */
export type ColumnPropertiesState = {
    type ?: TableColumnEnum
    comment ?: string
    default ?: DefaultValue
    nullable ?: boolean
    index ?: TableIndex
    unique ?: UniqueIndex
    primary ?: boolean
    increments ?: boolean
    foreign ?: boolean
}