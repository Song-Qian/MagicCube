/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/06/14 11:45
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 数据库架构初始化时,连接器和表对应生成逻辑和事件处理.
 */

import IServiceSynchResolverModule from "~/dependency/i_service_synch_resolver_module"
import IServiceAsyncResolverModule from "~/dependency/i_service_async_resolver_module"
import ResolverModuleFactory from "~/dependency/resolver_module_factory"
import ConnectionFactory from "./connection/connection_factory"
import { isPromise, synchronizationLock, walker } from "~/utils/common"
import { ColumnPropertiesState, TableIndex, UniqueIndex } from "./schema_type"
import { Knex as KnexSchema } from "knex"
import { IRepository } from "./i_repository"
import ISchema from "./i_schema"

const createTransactionTask = async (clientName: string, dbContext: KnexSchema, repository: IRepository, advance: Generator) => {
    repository.dbContext = dbContext;
    const tableName = Reflect.getMetadata(Symbol.for("magic:table"), repository.constructor);
    const tableViewExpression = Reflect.getMetadata(Symbol.for("magic:tableViewExpression"), repository.constructor);
    const isDrop = Reflect.getMetadata(Symbol.for("magic:dropTableIfExists"), repository.constructor);
    const trx = await dbContext.transaction();
    let synchronousPipe : PromiseLike<boolean> = Promise.resolve(false);
    if (isDrop) {
        const isPreventDropTable = repository.$beforeDropTable ? repository.$beforeDropTable(trx) : false;
        //$afterDropTable 无返回值，但dbContext.schema.dropViewIfExists确实已持行，因此永远为Promise.resolve(true)
        const afterDropDone = () => {
            const isAfterDropTable = repository.$afterDropTable && repository.$afterDropTable(trx) || true; 
            return isAfterDropTable && isPromise(isAfterDropTable) ? (<Promise<void>>isAfterDropTable).then(() => Promise.resolve(true)) : Promise.resolve(true);
        }; 
        const beforeDropDone = (yes : boolean) => {
            let exec = {
                // "MSSQL" : () => dbContext.select(dbContext.raw("'alter table ['+ OBJECT_SCHEMA_NAME(parent_object_id) +'].['+ OBJECT_NAME(parent_object_id) +'] drop constraint ['+ name +'];' as dropContext")).from('sys.foreign_keys').where(dbContext.raw('referenced_object_id = object_id(?)', tableName)).transacting(trx).then((row) => {
                //     return row.length ? Promise.all(row.map((it) => dbContext.raw(it.dropContext).transacting(trx))) : Promise.resolve([]);
                // }).then(() => dbContext.schema.dropTableIfExists(tableName).transacting(trx)).then(afterDropDone),
                "MSSQL": () => trx.raw(`IF OBJECT_ID(N'${tableName}', N'U') IS NOT NULL ALTER TABLE [${tableName}] NOCHECK CONSTRAINT ALL`)
                        .then(() => trx.schema.dropTableIfExists(tableName))
                        .then(() => trx.raw(`IF OBJECT_ID(N'${tableName}', N'U') IS NOT NULL ALTER TABLE [${tableName}] CHECK CONSTRAINT ALL`)).then(afterDropDone),
                "MYSQL": () => trx.raw("Set FOREIGN_KEY_CHECKS = 0")
                        .then(() => trx.schema.dropTableIfExists(tableName))
                        .then(() => trx.raw("Set FOREIGN_KEY_CHECKS = 0")).then(afterDropDone)
            }

            return yes ? Promise.resolve(!yes) : tableViewExpression ? trx.schema.dropViewIfExists(tableName).then(afterDropDone) : exec[clientName]()
        };
        synchronousPipe = isPreventDropTable && isPromise(isPreventDropTable) ?  (<Promise<boolean>>isPreventDropTable).then(beforeDropDone) :  beforeDropDone(Boolean(isPreventDropTable));
    }

    const createDone = (yes: boolean) : PromiseLike<boolean> => {
        // yes 来自 $beforeCreateTable Hook函数返回值，当yes = true时，用户需要创建数据表，返之则阻止数据表格被创建。
        return !yes ? Promise.resolve(yes) : new Promise((resolve, reject) => {
            const isBeforeTableInit = repository.$beforeTableInitialize && repository.$beforeTableInitialize(trx) || true;

            if (!Boolean(tableViewExpression)) {
                const createFn = (table) => {
                    const tableEngine = Reflect.getMetadata(Symbol.for("magic:tableEngine"), repository.constructor)
                    const tableCharset = Reflect.getMetadata(Symbol.for("magic:tableCharset"), repository.constructor)
                    const tableCollate = Reflect.getMetadata(Symbol.for("magic:tableCollate"), repository.constructor)
                    clientName === "MYSQL" && table.charset(tableCharset);
                    clientName === "MYSQL" && table.engine(tableEngine);
                    clientName === "MYSQL" && table.collate(tableCollate);
                    const initializeTablePropsDone = () : Promise<boolean> => {
                        const initializePropsDone = (field : string) : Promise<Boolean> => {
                            const columnName = Reflect.getMetadata(Symbol.for("magic:tableColumnName"), repository, field);
                            const isIgnore = Reflect.getMetadata(Symbol.for("magic:tableIgnoreColumn"), repository, field);
                            const ignoreColumn = Reflect.getMetadata(Symbol.for("magic:tableIgnoreColumnForDb"), repository, field);
                            if (columnName && (!(isIgnore && (ignoreColumn.length === 0 || ignoreColumn.indexOf(clientName) > -1)) || !isIgnore)) {
                                const columnType = Reflect.getMetadata(Symbol.for("magic:tableColumnType"), repository, field);
                                const columnComment = Reflect.getMetadata(Symbol.for("magic:tableColumnComment"), repository, field);
                                const columnOptions = Reflect.getMetadata(Symbol.for("magic:tableColumnOptions"), repository, field);
                                const columnDefaultValue = Reflect.getMetadata(Symbol.for("magic:tableColumnDefaultValue"), repository, field);
                                const columnDefaultOptions = Reflect.getMetadata(Symbol.for("magic:tableColumnDefaultOptions"), repository, field);
                                const columnNullable = Reflect.getMetadata(Symbol.for("magic:tableColumnNullable"), repository, field);
                                const columnNotNullable = Reflect.getMetadata(Symbol.for("magic:tableColumnNotNullable"), repository, field);
                                const columnIndex = Reflect.getMetadata(Symbol.for("magic:tableIndexName"), repository, field);
                                const columnIndexOptions : TableIndex = <TableIndex>Reflect.getMetadata(Symbol.for("magic:tableIndexOptions"), repository, field);
                                const columnUnique = Reflect.getMetadata(Symbol.for("magic:tableUniqueName"), repository, field);
                                const columnUniqueOptions : UniqueIndex = <UniqueIndex>Reflect.getMetadata(Symbol.for("magic:tableUniqueOptions"), repository, field);
                                const tablePrimaryKey = Reflect.getMetadata(Symbol.for("magic:tablePrimaryKey"), repository, field);
                                const tablePrimaryKeys = Reflect.getMetadata(Symbol.for("magic:tablePrimaryKeys"), repository, field);
                                const columnIncrements = Reflect.getMetadata(Symbol.for("magic:tableIncrementsColumn"), repository, field);
                                const columnIncrementsOptions = Reflect.getMetadata(Symbol.for("magic:tableIncrementsOptions"), repository, field);
                                const columnForeignKey = Reflect.getMetadata(Symbol.for("magic:tableForeignKey"), repository, field);
                                const columnForeignOptions = Reflect.getMetadata(Symbol.for("magic:tableForeignOptions"), repository, field);
                                const columnFactory = [ table.integer, table.bigInteger, table.text, table.string, table.float, table.double, table.decimal, table.boolean, table.date, table.dateTime, table.time, table.timestamp, table.binary, table.enum, table.json, table.jsonb, table.uuid, table.geometry, table.geography, table.point ];
                                let properitesState : ColumnPropertiesState;
                                if (columnIncrements) {
                                    // 增量列
                                    table.increments(columnName, columnIncrementsOptions);
                                    properitesState = { type: 0, comment: '', nullable: false, primary: columnName, increments : true }
                                } else {
                                    //非增量列
                                    let columnBuilder = <KnexSchema.ColumnBuilder>(<any>columnFactory[columnType]).apply(table, [columnName, ...columnOptions]);
                                    columnBuilder = columnComment && columnBuilder.comment(columnComment) || columnBuilder;
                                    columnBuilder = columnNullable && columnBuilder.nullable() || columnBuilder;
                                    columnBuilder = columnNotNullable && columnBuilder.notNullable() || columnBuilder;
                                    columnBuilder = columnDefaultValue && columnBuilder.defaultTo(columnDefaultValue, columnDefaultOptions) || columnBuilder;
                                    columnIndex && table.index(columnName, columnIndex, columnIndexOptions);
                                    columnUnique && table.unique(columnName, columnUniqueOptions);
                                    tablePrimaryKey && table.primary(tablePrimaryKeys || columnName);
                                    columnForeignKey && table.foreign(columnName, columnForeignKey).references(`${columnForeignOptions.foreignTable}.${columnForeignOptions.foreignColumn}`).onDelete(columnForeignOptions.onDelete || "CASCADE").onUpdate(columnForeignOptions.onUpdate || "CASCADE");
                                    properitesState = { type: columnType, comment: columnComment, default: columnDefaultValue, nullable: !columnNotNullable && columnNullable, index: columnIndexOptions, unique: columnUniqueOptions, primary: Boolean(tablePrimaryKey), increments : false, foreign: Boolean(columnForeignKey) }
                                }
                                const updateColumnPropsPromise = repository.$updateTableColumnProps && repository.$updateTableColumnProps(trx, table, columnName, properitesState) || true;
                                return updateColumnPropsPromise && isPromise(updateColumnPropsPromise) ? (<Promise<void>>updateColumnPropsPromise).then(() => Promise.resolve(true)) : Promise.resolve(true);
                            }
                            return Promise.resolve(false)
                        }
                        const updateColumnsDone = () =>  Object.keys(Object.getPrototypeOf(repository)).map(initializePropsDone);
                        return Promise.all(updateColumnsDone()).then(() => new Promise((resolve) => {
                            const isAfterTableInit  =  repository.$afterTableInitialized && repository.$afterTableInitialized(trx, table) || true;
                            isAfterTableInit && isPromise(isAfterTableInit) ? (<Promise<void>>isAfterTableInit).then(() => resolve(true)) : resolve(true);
                        }))
                    }
                    isBeforeTableInit && isPromise(isBeforeTableInit) ?  (<Promise<void>>isBeforeTableInit).then(initializeTablePropsDone) : Promise.resolve(initializeTablePropsDone())
                }
                trx.schema.hasTable(tableName).then((yes) => yes ? resolve(false) : trx.schema.createTable(tableName, createFn).then(() => resolve(true)).catch(reject)).catch(reject);
            }

            if (Boolean(tableViewExpression)) {
                const createFn = () => {
                    return trx.schema.createViewOrReplace(tableName, (view) => {
                        view.as(tableViewExpression);
                        view.columns(Object.keys(repository).map((key : string) => Reflect.getMetadata(Symbol.for("magic:tableColumnName"), repository, key) ?? []).flat(2));
                    }).then(() => resolve(true))
                }
                isBeforeTableInit && isPromise(isBeforeTableInit) ? (<Promise<void>>isBeforeTableInit).then(createFn).catch(reject) : Promise.resolve(createFn()).catch(reject);
            }
        })
    };

    synchronousPipe = synchronousPipe.then((_) => {
        // _ == true dbContext.schema.dropTableIfExists则被持行，yes == false $beforeDropTable 钩子函数阻止了表格删除。
        // _ = boolean 任何值，都没有意义，因为创建当前表必需要持行，只能留给未来扩展需要。
        const isPreventCreateTable = repository.$beforeCreateTable ? repository.$beforeCreateTable(trx) : true;
        return isPreventCreateTable && isPromise(isPreventCreateTable) ? (<Promise<boolean>>isPreventCreateTable).then(createDone) : createDone(Boolean(isPreventCreateTable));
    })

    synchronousPipe = synchronousPipe.then((yes : boolean) => {
        // yes  == true 表示 $beforeCreateTable， $beforeTableInitialize, $updateTableColumnProps, $afterTableInitialized hooks 函数正常被调用。
        // yes == fasel 表示 $beforeCreateTable 用户阻表被创建
        if (yes) {
            const isCreatedDone = repository.$afterCreateTable && repository.$afterCreateTable(trx) || true;
            return isCreatedDone && isPromise(isCreatedDone) ? (<Promise<void>>isCreatedDone).then(() => Promise.resolve(true)) : Promise.resolve(true);
        } 
        return Promise.resolve(!yes);
    })
    
    const Quit = (error : any) => trx.rollback().then(() => repository.$errorHandler && repository.$errorHandler(error) || Promise.resolve(void 0)).finally(() => process.exit());
    const Done = () => trx.commit().then(() => (repository.$done && repository.$done(trx))).catch(Quit);
    advance.next(await synchronousPipe.then(Done, Quit));
}

export default function(configure: any) {
    const me : ISchema = this;
    const clientName = Reflect.getMetadata(Symbol.for("Kind"), me.constructor);
    const $onPoolCreated = (conn) => me.emit("$onPoolCreated", conn, configure.get("database"));
    const dbContext = ConnectionFactory(clientName, configure, $onPoolCreated);

    const resolveLoadedModule = function() {
        let repositorys = ResolverModuleFactory.getInstance().GetAnyModels<IRepository>(Symbol.for("magic:table"));
        let lock = synchronizationLock(false);
        let tasks: Array<{ fn: (...args) => any, args: Array<any> }> = [];
        let advance = walker(lock,  tasks);
        repositorys.forEach((repository : IRepository) => {
            tasks.push({ fn : createTransactionTask, args: [clientName, dbContext, repository, advance] })
        });
        tasks.push({ fn: () => lock.next(false), args: [] });
        advance.next();
    }

    me.once("dependencyResolvers", <M extends IServiceSynchResolverModule | IServiceAsyncResolverModule> (app, ..._modules: Array<M>) => { 
        ResolverModuleFactory.getInstance(..._modules).on("onLoadedModules", resolveLoadedModule)
    });
} 