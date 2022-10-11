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
import { isPromise } from "~/utils/common"
import { ColumnPropertiesState, PrimaryKey, TableIndex, UniqueIndex } from "./schema_type"
import { Knex as KnexSchema } from "knex"
import { IRepository } from "./i_repository"
import ISchema from "./i_schema"

export default function(configure: any) {
    const me : ISchema = this;
    const clientName = Reflect.getMetadata(Symbol.for("Kind"), me.constructor);
    const $onPoolCreated = (conn) => me.emit("$onPoolCreated", conn, configure.get("database"));
    const dbContext = ConnectionFactory(clientName, configure, $onPoolCreated);

    const resolveLoadedModule = function() {
        let repositorys = ResolverModuleFactory.getInstance().GetAnyModels<IRepository>(Symbol.for("magic:table"));
        repositorys.map((repository : IRepository) => {
            repository.dbContext = dbContext;
            const tableName = Reflect.getMetadata(Symbol.for("magic:table"), repository.constructor);
            const tableViewExpression = Reflect.getMetadata(Symbol.for("magic:tableViewExpression"), repository.constructor);
            const isDrop = Reflect.getMetadata(Symbol.for("magic:dropTableIfExists"), repository.constructor);
            let synchronousPipe : PromiseLike<boolean> = Promise.resolve(false);
            
            if (isDrop) {
                const isPreventDropTable = repository.$beforeDropTable && repository.$beforeDropTable() || false;
                const dropDone = (yes : boolean) => yes ? !yes : Boolean(tableViewExpression ? dbContext.schema.dropViewIfExists(tableName) : dbContext.schema.dropTableIfExists(tableName));
                synchronousPipe = isPreventDropTable && isPromise(isPreventDropTable) ?  (<Promise<boolean>>isPreventDropTable).then(dropDone) : Promise.resolve(dropDone(Boolean(isPreventDropTable)));
                synchronousPipe = synchronousPipe.then((yes : boolean) => {
                    if (yes && repository.$afterDropTable) {
                        const isAfterDropDone =  repository.$afterDropTable();
                        return isPromise(isAfterDropDone) ? (<Promise<void>>isAfterDropDone).then(() => Promise.resolve(true)) : Promise.resolve(true);
                    }
                    return Promise.resolve(false);
                });
            }
            const createDone = (yes: boolean) : PromiseLike<boolean> => {
                return yes ? Promise.resolve(!yes) : new Promise((resolve, reject) => {
                    const isBeforeTableInit = repository.$beforeTableInitialize ? (repository.$beforeTableInitialize() || true) : false;
                    if (!Boolean(tableViewExpression)) {
                        const createFn = (table) => {
                            const tableEngine = Reflect.getMetadata(Symbol.for("magic:tableEngine"), repository.constructor)
                            const tableCharset = Reflect.getMetadata(Symbol.for("magic:tableCharset"), repository.constructor)
                            const tableCollate = Reflect.getMetadata(Symbol.for("magic:tableCollate"), repository.constructor)
                            table.charset(tableCharset);
                            table.engine(tableEngine);
                            table.collate(tableCollate);
                            const initializeTablePropsDone = () : Promise<boolean> => {
                                const initializePropsDone = (field : string) : Promise<Boolean> => {
                                    const columnName = Reflect.getMetadata(Symbol.for("magic:tableColumnName"), repository, field);
                                    if (columnName) {
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
                                        const tablePrimaryKeyName = Reflect.getMetadata(Symbol.for("magic:tablePrimaryKeyName"), repository, field);
                                        const tablePrimaryKeyType = Reflect.getMetadata(Symbol.for("magic:tablePrimaryKeyType"), repository, field);
                                        const columnIncrements = Reflect.getMetadata(Symbol.for("magic:tableIncrementsColumn"), repository, field);
                                        const columnIncrementsOptions = Reflect.getMetadata(Symbol.for("magic:tableIncrementsOptions"), repository, field);
                                        const columnForeignKey = Reflect.getMetadata(Symbol.for("magic:tableForeignKey"), repository, field);
                                        const columnForeignOptions = Reflect.getMetadata(Symbol.for("magic:tableForeignOptions"), repository, field);
                                        const columnFactory = [ table.integer, table.bigInteger, table.text, table.string, table.float, table.double, table.decimal, table.boolean, table.date, table.dateTime, table.time, table.timestamp, table.timestamps, table.binary, table.enum, table.json, table.jsonb, table.uuid, table.geometry, table.geography, table.point ];
                                        let columnBuilder = <KnexSchema.ColumnBuilder>(<any>columnFactory[columnType]).apply(table, [columnName, ...columnOptions]);
                                        if (clientName === "MYSQL") {
                                            columnBuilder = columnDefaultValue && columnBuilder.defaultTo(columnDefaultValue, columnDefaultOptions) || columnBuilder;
                                        }
                                        columnBuilder = columnComment && columnBuilder.comment(columnComment) || columnBuilder;
                                        columnBuilder = columnNullable && columnBuilder.nullable() || columnBuilder;
                                        columnBuilder = columnNotNullable && columnBuilder.notNullable() || columnBuilder;
                                        columnIndex && table.index(columnName, columnIndex, columnIndexOptions);
                                        columnUnique && table.unique(columnName, columnUniqueOptions);
                                        tablePrimaryKeyName && table.primary(columnName, { constraintName: tablePrimaryKeyName, deferrable: tablePrimaryKeyType });
                                        columnIncrements && table.increments(columnName, columnIncrementsOptions);
                                        columnForeignKey && table.foreign(columnName, columnForeignKey).references(`${columnForeignOptions.table}.${columnForeignOptions.foreignColumn}`).onDelete(columnForeignOptions.onDelete || "CASCADE").onUpdate(columnForeignOptions.onUpdate || "CASCADE");
                                        const properitesState : ColumnPropertiesState = { type: columnType, comment: Boolean(columnComment), default: Boolean(columnDefaultValue), nullable: !columnNotNullable && columnNullable, index: Boolean(columnIndex), unique: Boolean(columnUnique), primary: Boolean(tablePrimaryKeyName), increments : Boolean(columnIncrements), foreign: Boolean(columnForeignKey) };
                                        const updateColumnPropsPromise = repository.$updateTableColumnProps && repository.$updateTableColumnProps(table, columnName, properitesState);
                                        return isPromise(updateColumnPropsPromise) ? (<Promise<void>>updateColumnPropsPromise).then(() => true) : Promise.resolve(true);
                                    }
                                    return Promise.resolve(false)
                                }
                                const updateColumnsDone = () =>  Object.keys(Object.getPrototypeOf(repository)).map(initializePropsDone);
                                return Promise.all(updateColumnsDone()).then(() => {
                                    const isAfterTableInit  =  repository.$afterTableInitialized && repository.$afterTableInitialized(table) || false;
                                    return isPromise(isAfterTableInit) ? (<Promise<void>>isAfterTableInit).then(() => true) : Promise.resolve(true);
                                })
                            }
                            isBeforeTableInit && isPromise(isBeforeTableInit) ?  (<Promise<void>>isBeforeTableInit).then(initializeTablePropsDone).then(resolve, reject) : Promise.resolve(initializeTablePropsDone()).then(resolve, reject)
                        }
                        
                        dbContext.schema.hasTable(tableName).then(yes => yes ? resolve(false) : dbContext.schema.createTable(tableName, createFn));
                    }

                    if (Boolean(tableViewExpression)) {
                        dbContext.schema.createViewOrReplace(tableName, (view) => {
                            view.as(tableViewExpression);
                            view.columns(Object.keys(repository).map((key : string) => Reflect.getMetadata(Symbol.for("magic:tableColumnName"), repository, key) ?? []).flat(2));
                            isBeforeTableInit && isPromise(isBeforeTableInit) ?  (<Promise<void>>isBeforeTableInit).then(() => resolve(true), reject) : Promise.resolve().then(() => resolve(true), reject)
                        })
                    }
                })
            };
            synchronousPipe = synchronousPipe.then(() => {
                const isPreventCreateTable = repository.$beforeCreateTable && repository.$beforeCreateTable() || false;
                return isPreventCreateTable && isPromise(isPreventCreateTable) ? (<Promise<boolean>>isPreventCreateTable).then(createDone) : createDone(Boolean(isPreventCreateTable));
            })

            synchronousPipe = synchronousPipe.then((yes : boolean) => {
                if (!yes) {
                    const isCreatedDone = repository.$afterCreateTable ? (repository.$afterCreateTable() || true) : false ;
                    return isPromise(isCreatedDone) ? (<Promise<void>>isCreatedDone).then(() => Promise.resolve(true)) : Promise.resolve(Boolean(isCreatedDone));
                } 
                return Promise.resolve(!yes);
            })
            const Quit = (error : any) => {
                const errorDone = repository.$errorHandler && repository.$errorHandler(error) || Promise.resolve(void 0);
                errorDone.then(() => process.exit());
            };
            synchronousPipe.then(() => void 0, Quit);
            return synchronousPipe;
        });
    }

    me.once("dependencyResolvers", <M extends IServiceSynchResolverModule | IServiceAsyncResolverModule> (app, ..._modules: Array<M>) => { 
        ResolverModuleFactory.getInstance(..._modules).on("onLoadedModules", resolveLoadedModule)
    });
} 