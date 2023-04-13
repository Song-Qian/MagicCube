/*
 * @Author: @skysong
 * @Date: 2022-04-17 17:29:43
 * @Description: 数据库业务操作封装接口
 * @eMail: onlylove1172559463@vip.qq.com
 */
import { Knex as KnexSchema } from "knex"
import { ColumnPropertiesState } from "./schema_type"

export interface IRepository {
    
    dbContext: KnexSchema;

    $beforeDropTable ?: (trx: KnexSchema.Transaction) => Promise<boolean> | boolean;

    $afterDropTable ?:  (trx: KnexSchema.Transaction) => Promise<void> | void;

    $beforeCreateTable ?:  (trx: KnexSchema.Transaction) => Promise<boolean> | boolean;

    $beforeTableInitialize ?: (trx: KnexSchema.Transaction) => Promise<void> | void;

    $updateTableColumnProps ?:  (trx: KnexSchema.Transaction, table : KnexSchema.CreateTableBuilder, columnName : string, state : ColumnPropertiesState) => Promise<void> | void;

    $afterTableInitialized ?: (trx: KnexSchema.Transaction, table : KnexSchema.CreateTableBuilder) => Promise<void> | void;

    $afterCreateTable ?: (trx: KnexSchema.Transaction) => Promise<void> | void;

    $done ?: (trx: KnexSchema.Transaction) => Promise<void> | void;

    $errorHandler ?:  (error : any) => Promise<void> | void;

    $beforeExecute ?: (data : any) =>  void;

    $executeError ?: (err: Error, obj: any) => void;

    $afterExecute ?: (response: any, obj: any, builder) => void;

}
