/*
 * @Author: SongQian
 * @Date: 2022-04-17 17:29:43
 * @Description: 数据库业务操作封装接口
 * @eMail: onlylove1172559463@vip.qq.com
 */
import { Knex as KnexSchema } from "knex"
import { ColumnPropertiesState } from "./schema_type";

export interface IRepository {
    dbContext: KnexSchema;

    $beforeDropTable ?: () => Promise<boolean> | boolean;

    $afterDropTable ?:  () => Promise<void> | void;

    $beforeCreateTable ?:  () => Promise<boolean> | boolean;

    $beforeTableInitialize ?: () => Promise<void> | void;

    $updateTableColumnProps ?:  (table : KnexSchema.CreateTableBuilder, columnName : string, state : ColumnPropertiesState) => Promise<void> | void;

    $afterTableInitialized ?: (table : KnexSchema.CreateTableBuilder) => Promise<void> | void;

    $afterCreateTable ?: () => Promise<void> | void;

    $errorHandler ?:  (error : any) => Promise<void> | void;
}
