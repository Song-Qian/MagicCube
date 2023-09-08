/// <reference types="node" />
import { Knex as KnexSchema } from "knex";
export declare enum TableColumnEnum {
    Integer = 0,
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
export declare type TableIndex = {
    indexType?: "FULLTEXT" | "SPATIAL";
    storageEngineIndexType?: "btree" | "hash";
    predicate?: KnexSchema.QueryBuilder;
};
export declare type UniqueIndex = {
    indexName: string;
    deferrable: 'not deferrable' | 'immediate' | 'deferred';
    storageEngineIndexType: "btree" | "hash";
    useConstraint: boolean;
};
export declare type PrimaryKey = {
    constraintName: string;
    deferrable?: 'not deferrable' | 'immediate' | 'deferred';
};
export declare type DefaultValue = string | number | boolean | null | Date | Array<string> | Array<number> | Array<Date> | Array<boolean> | Buffer;
export declare type ColumnPropertiesState = {
    type?: TableColumnEnum;
    comment?: string;
    default?: DefaultValue;
    nullable?: boolean;
    index?: TableIndex;
    unique?: UniqueIndex;
    primary?: boolean;
    increments?: boolean;
    foreign?: boolean;
};
