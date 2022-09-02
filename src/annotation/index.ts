/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/05/25 16:32
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: Magic Cube 扩展注解
 */
import 'reflect-metadata'
import { Knex as KnexSchema } from 'knex'
import { Hook } from '@feathersjs/feathers'
import { HttpService } from '../services/http_service'
import { TableColumnEnum, TableIndex, UniqueIndex, PrimaryKey } from '../repository/schema_type'

const defineClassMetadata = (key: Symbol, value: any): ClassDecorator => {
    return (target: Function) => {
        Reflect.defineMetadata(key, value, target);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 11:27
 * @description: RESTFUL Api 接口控制器修饰器
 * @param {any} api 地址路由
 * @return {*} \@ApiController("/api/a/path")
 */
export const ApiController = (value: any) => {
    return defineClassMetadata(Symbol.for('magic:api'), value);
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 11:28
 * @description: 内置File Stream 文件上传上载复用器,不对外公开
 * @return {*} \@FileMultiplexer()
 */
export const FileMultiplexer = () => {
    return defineClassMetadata(Symbol.for("Kind"), "FILE");
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 11:30
 * @description:  内置RESTFUL 接口复用器,不对外公开
 * @return {*} \@RestMultiplexer()
 */
export const RestMultiplexer = () => {
    return defineClassMetadata(Symbol.for("Kind"), "REST");
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 11:43
 * @description: 内置View UI接口复用器, 不对外公开
 * @return {*} \@ViewMultiplexer()
 */
export const ViewMultiplexer = () => {
    return defineClassMetadata(Symbol.for("Kind"), "VIEW");
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 14:50
 * @description: 内置MySQL架构修饰器,不对外公开
 * @return {*} \@MySqlSchema()
 */
export const MySqlSchema = (fn: (configure: any) => void) => {
    return (target: Function) => {
        Reflect.defineMetadata(Symbol.for("Kind"), "MYSQL", target);
        Reflect.defineProperty(target.prototype, "Initialize", {
            configurable: true,
            enumerable: true,
            writable: false,
            value: fn
        })
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 14:53
 * @description: 内置Oracle 架构修饰器,不对外公开
 * @return {*} \@OracleSchema()
 */
export const OracleSchema = (fn: (configure: any) => void) => {
    return (target: Function) => {
        Reflect.defineMetadata(Symbol.for("Kind"), "ORACLE", target);
        Reflect.defineProperty(target.prototype, "Initialize", {
            configurable: true,
            enumerable: true,
            writable: false,
            value: fn
        })
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 14:54
 * @description: 内置PG架构修饰器,不对外公开
 * @return {*} \@PGSchema()
 */
export const PGSchema = (fn: (configure: any) => void) => {
    return (target: Function) => {
        Reflect.defineMetadata(Symbol.for("Kind"), "PG", target);
        Reflect.defineProperty(target.prototype, "Initialize", {
            configurable: true,
            enumerable: true,
            writable: false,
            value: fn
        })
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 14:54
 * @description: 内置SQLITE3架构修饰器,不对外公开
 * @return {*} \@Sqlite3Schema()
 */
export const Sqlite3Schema = (fn: (configure: any) => void) => {
    return (target: Function) => {
        Reflect.defineMetadata(Symbol.for("Kind"), "SQLITE3", target);
        Reflect.defineProperty(target.prototype, "Initialize", {
            configurable: true,
            enumerable: true,
            writable: false,
            value: fn
        })
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/29 23:19
 * @description: ORM模式启动时自动检测是否删除已存在的表
 * @return {*} \@DropTableIfExists()
 */
export const DropTableIfExists = () => {
    return defineClassMetadata(Symbol.for("magic:dropTableIfExists"), true);
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/25 17:17
 * @description: ORM模式中表信息修饰器
 * @param {string} 表名
 * @param {string} 数据库表引擎
 * @param {string} 数据库表字符集
 * @param {string} 数据库表排序规则
 * @return {*} \@DataTable("user")
 */
export const DataTable = (name: string, engine: string = "innodb", charset: string = "utf8", collate: string = "utf8mb4") => {
    return (target: Function) => {
        Reflect.defineMetadata(Symbol.for("magic:table"), name, target);
        engine && Reflect.defineMetadata(Symbol.for("magic:tableEngine"), engine, target);
        charset && Reflect.defineMetadata(Symbol.for("magic:tableCharset"), charset, target);
        collate && Reflect.defineMetadata(Symbol.for("magic:tableCollate"), collate, target);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 11:05
 * @description: ORM模式中表视图修饰器
 * @param {string} 视图名
 * @param {Knex} 视图表达式
 * @return {*} \@DataView("user_view", kenx.raw("select user.name, user.email, role.name from user, role where user.id = role.userid"))
 */
export const DataView = (viewName: string, table: KnexSchema.QueryBuilder) => {
    return (target: Function) => {
        Reflect.defineMetadata(Symbol.for("magic:table"), viewName, target);
        Reflect.defineMetadata(Symbol.for("magic:tableViewExpression"), table, target);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/25 17:04
 * @description: ORM模式中与表字段中对应关系映射和字段类型描述修饰器
 * @param {string} 表字段名称
 * @param {TableColumnEnum} 表字段数据类型
 * @param {string} 表字段描述文本
 * @param {any} 表字段数据描述选项
 * @return {*} \@TableColumn('field', TableColumnEnum.Integer, '这是一个字段', 10)
 */
export const TableColumn = (columnName: string, dataType: TableColumnEnum, description?: string, options?: Readonly<any[]>) => {
    return (target: any, name: string) => {
        Reflect.defineMetadata(Symbol.for("magic:tableColumnName"), columnName, target, name);
        Reflect.defineMetadata(Symbol.for("magic:tableColumnType"), dataType, target, name);
        description && Reflect.defineMetadata(Symbol.for("magic:tableColumnComment"), description, target, name);
        options && Reflect.defineMetadata(Symbol.for("magic:tableColumnOptions"), options, target, name);
    }
}

type DefaultValue = string | number | boolean | null | Date | Array<string> | Array<number> | Array<Date> | Array<boolean> | Buffer;

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/31 17:41
 * @description: ORM模式中表字段默认值,只支持数据库.
 * @param {DefaultValue} value
 * @param {string} constraintName
 * @return {*}
 */
export const DefaultValueColumn = (value: DefaultValue, constraintName: string = "") => {
    return (target: any, name: string) => {
        Reflect.defineMetadata(Symbol.for("magic:tableColumnDefaultValue"), value, target, name);
        Reflect.defineMetadata(Symbol.for("magic:tableColumnDefaultOptions"), { constraintName }, target, name);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/25 17:33
 * @description: ORM模式中表字段是否允许为NULL修饰器
 * @return {*} \@NullableColumn()
 */
export const NullableColumn = () => {
    return (target: any, name: string) => {
        Reflect.defineMetadata(Symbol.for("magic:tableColumnNullable"), true, target, name);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/31 17:29
 * @description: ORM模式中表字段是否不为NULL修饰器
 * @return {*} \@NotNullableColumn()
 */
export const NotNullableColumn = () => {
    return (target: any, name: string) => {
        Reflect.defineMetadata(Symbol.for("magic:tableColumnNotNullable"), true, target, name);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/25 17:57
 * @description:  ORM模式中表字段的索引修饰器
 * @param {string} 索引名称
 * @param {TableIndex} 索引配置
 * @return {*} \@IndexColumn("idx_name", { indexType: "FULLTEXT", storageEngineIndexType: "hash", predicate: knex.whereNotNull('email') })
 */
export const IndexColumn = (indexName: string, options: TableIndex) => {
    return (target: any, name: string) => {
        Reflect.defineMetadata(Symbol.for("magic:tableIndexName"), indexName, target, name);
        Reflect.defineMetadata(Symbol.for("magic:tableIndexOptions"), options, target, name);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 10:35
 * @description: ORM模式中表字段唯一索引修饰器
 * @param {string} 索引名称
 * @param {UniqueIndex} 索引配置
 * @return {*} \@UniqueColumn({ indexName: "idx_name", deferrable: "deferred", storageEngineIndexType: "hash", useConstraint: true })
 */
export const UniqueColumn = (options: UniqueIndex = { indexName: "idx_name", deferrable: "deferred", storageEngineIndexType: "hash", useConstraint: true }) => {
    return (target: any, name: string) => {
        Reflect.defineMetadata(Symbol.for("magic:tableUniqueName"), options.indexName, target, name);
        Reflect.defineMetadata(Symbol.for("magic:tableUniqueOptions"), options, target, name);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 10:40
 * @description: ORM模式中表字段主键修饰器
 * @param {string} 主键列名
 * @param {PrimaryKey} 主键配置
 * @return {*} \@PrimaryColumn("pk_name", { constraintName: "",  deferrable: "notdeferrable" })
 */
export const PrimaryColumn = (columnName: string, options: PrimaryKey) => {
    return (target: any, name: string) => {
        let keys = Object.keys(target).filter(key => Reflect.getMetadata(Symbol.for("magic:tablePrimaryKey"), target, key));
        if (keys.length > 0) {
            throw new Error(`${target.constructor.name} contains more than one primary key (@PrimaryColumn) field configuration`);
        }
        Reflect.defineMetadata(Symbol.for("magic:tablePrimaryKey"), columnName, target, name);
        Reflect.defineMetadata(Symbol.for("magic:tablePrimaryOptions"), options, target, name);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/07/10 16:02
 * @description: Magic props with incredible abilities~~~
 * @param {string} 外键字段
 * @param {string} 外表
 * @param {object} 外键检查约束规则
 * @return {*} \@ForeignColumn("column", "table", { onDelete: "CASCADE", onUpdate: "CASCADE" })
 */
export const ForeignColumn = (columnName: string, inTable?: string, opts?: { onDelete: "RESTRICT" | "CASCADE" | "SET NULL" | "NO ACTION", onUpdate: "RESTRICT" | "CASCADE" | "SET NULL" | "NO ACTION" }) => {
    return (target: any, name: string) => {
        let table = inTable ? inTable : false;
        let onDelete = opts && opts.onDelete ? opts.onDelete : false;
        let onUpdate = opts && opts.onUpdate ? opts.onUpdate : false;
        let foreignKey = table ? `fk_${name}_${table}_${columnName}` : `fk_${name}_${columnName}`;
        Reflect.defineMetadata(Symbol.for("magic:tableForeignKey"), foreignKey, target, name);
        Reflect.defineMetadata(Symbol.for("magic:tableForeignOptions"), { foreignColumn: columnName, table, onDelete, onUpdate }, target, name);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/30 22:43
 * @description: ORM模式中表字段自增修饰器
 * @param {string} 列名
 * @param {object} 自培选项
 * @return {*} \@IncrementsColumn("columnName", { primaryKey : true })
 */
export const IncrementsColumn = (columnName: string, options: { primaryKey: boolean }) => {
    return (target: any, name: string) => {
        Reflect.defineMetadata(Symbol.for("magic:tableIncrementsColumn"), columnName, target, name);
        Reflect.defineMetadata(Symbol.for("magic:tableIncrementsOptions"), options, target, name);
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 11:45
 * @description: Api HTTP 请求管道钩子, 在请求到达处理器之前持行
 * @param {Hook} Function 钩子函数
 * @return {*} \@BeforeHook(() => Hook)
 */
export const BeforeHook = (fn: Hook): ClassDecorator | MethodDecorator => {
    return (...args) => {
        const target: any = args[0];
        const name: string = args[1];
        const descriptors: any = args[2];
        if (target.prototype && target.prototype.constructor instanceof HttpService) {
            const beforeHooks = target.prototype.beforeHooks || { all: [] };
            beforeHooks.all = [...beforeHooks.all, fn];
            Reflect.defineProperty(target.prototype, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "find") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { find: [] };
            beforeHooks.find = [...beforeHooks.find, fn];
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "get") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { get: [] };
            beforeHooks.get = [...beforeHooks.get, fn];
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "create") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { create: [] };
            beforeHooks.create = [...beforeHooks.create, fn];
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "update") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { update: [] };
            beforeHooks.update = [...beforeHooks.update, fn];
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "patch") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { patch: [] };
            beforeHooks.patch = [...beforeHooks.patch, fn];
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "remove") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { remove: [] };
            beforeHooks.remove = [...beforeHooks.remove, fn];
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 11:53
 * @description: Api HTTP 请求管道钩子, 在请求在处理器持行完成之后持行
 * @param {Hook} Function 钩子函数
 * @return {*} \@AfterHook(() => Hook)
 */
export const AfterHook = (fn: Hook): ClassDecorator | MethodDecorator => {
    return (...args) => {
        const target: any = args[0];
        const name: string = args[1];
        const descriptors: any = args[2];
        if (target.prototype && target.prototype.constructor instanceof HttpService) {
            const afterHooks = target.prototype.afterHooks || { all: [] };
            afterHooks.all = [...afterHooks.all, fn];
            Reflect.defineProperty(target.prototype, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "find") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { find: [] };
            afterHooks.find = [...afterHooks.find, fn];
            Reflect.defineProperty(target, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "get") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { get: [] };
            afterHooks.get = [...afterHooks.get, fn];
            Reflect.defineProperty(target, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "create") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { create: [] };
            afterHooks.create = [...afterHooks.create, fn];
            Reflect.defineProperty(target, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "update") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { update: [] };
            afterHooks.update = [...afterHooks.update, fn];
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "patch") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { patch: [] };
            afterHooks.patch = [...afterHooks.patch, fn];
            Reflect.defineProperty(target, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "remove") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { remove: [] };
            afterHooks.remove = [...afterHooks.remove, fn];
            Reflect.defineProperty(target, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 11:53
 * @description: Api HTTP 请求管道钩子, 钩子函数只有在处理器中发生异常时持行
 * @param {Hook} Function 钩子函数
 * @return {*} \@ErrorHook(() => Hook)
 */
export const ErrorHook = (fn: Hook): ClassDecorator | MethodDecorator => {
    return (...args) => {
        const target: any = args[0];
        const name: string = args[1];
        const descriptors: any = args[2];
        if (target.prototype && target.prototype.constructor instanceof HttpService) {
            const errorHooks = target.prototype.errorHooks || { all: [] };
            errorHooks.all = [...errorHooks.all, fn];
            Reflect.defineProperty(target.prototype, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "find") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { find: [] };
            errorHooks.find = [...errorHooks.find, fn];
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "get") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { get: [] };
            errorHooks.get = [...errorHooks.get, fn];
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "create") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { create: [] };
            errorHooks.create = [...errorHooks.create, fn];
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "update") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { update: [] };
            errorHooks.update = [...errorHooks.update, fn];
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "patch") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { patch: [] };
            errorHooks.patch = [...errorHooks.patch, fn];
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "remove") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { remove: [] };
            errorHooks.remove = [...errorHooks.remove, fn];
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }
    }
}

/**
 * @LastEditors: SongQian
 * @Author: SongQian
 * @Date: 2022/05/26 11:53
 * @description: Api HTTP 请求管道钩子, 钩子函数总是会在处理器之后持行
 * @param {Hook} Function 钩子函数
 * @return {*} \@FinallyHook(() => Hook)
 */
export const FinallyHook = (fn: Hook): ClassDecorator | MethodDecorator => {
    return (...args) => {
        const target: any = args[0];
        const name: string = args[1];
        const descriptors: any = args[2];
        if (target.prototype && target.prototype.constructor instanceof HttpService) {
            const finallyHooks = target.prototype.finallyHooks || { all: [] };
            finallyHooks.all = [...finallyHooks.all, fn];
            Reflect.defineProperty(target.prototype, "finallyHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...finallyHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "find") {
            const finallyHooks = Reflect.get(target, "finallyHooks", target) || { find: [] };
            finallyHooks.find = [...finallyHooks.find, fn];
            Reflect.defineProperty(target, "finallyHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...finallyHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "get") {
            const finallyHooks = Reflect.get(target, "finallyHooks", target) || { get: [] };
            finallyHooks.get = [...finallyHooks.get, fn];
            Reflect.defineProperty(target, "finallyHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...finallyHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "create") {
            const finallyHooks = Reflect.get(target, "finallyHooks", target) || { create: [] };
            finallyHooks.create = [...finallyHooks.create, fn];
            Reflect.defineProperty(target, "finallyHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...finallyHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "update") {
            const finallyHooks = Reflect.get(target, "finallyHooks", target) || { update: [] };
            finallyHooks.update = [...finallyHooks.update, fn];
            Reflect.defineProperty(target, "finallyHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...finallyHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "patch") {
            const finallyHooks = Reflect.get(target, "finallyHooks", target) || { patch: [] };
            finallyHooks.patch = [...finallyHooks.patch, fn];
            Reflect.defineProperty(target, "finallyHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...finallyHooks })
            })
        }

        if (target && target.constructor instanceof HttpService && name === "remove") {
            const finallyHooks = Reflect.get(target, "finallyHooks", target) || { remove: [] };
            finallyHooks.remove = [...finallyHooks.remove, fn];
            Reflect.defineProperty(target, "finallyHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...finallyHooks })
            })
        }
    }
}