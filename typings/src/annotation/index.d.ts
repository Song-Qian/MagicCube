import 'reflect-metadata';
import { Hook } from '@feathersjs/feathers';
import { TableColumnEnum, TableIndex, UniqueIndex, DefaultValue } from '../repository/schema_type';
export declare const ApiController: (value: string) => ClassDecorator;
export declare const FileController: (value: string, opts?: {
    mime: string;
}) => (target: Function) => void;
export declare const FileMultiplexer: () => ClassDecorator;
export declare const RestMultiplexer: () => ClassDecorator;
export declare const ViewMultiplexer: () => ClassDecorator;
export declare const MySqlSchema: (fn: (configure: any) => void) => (target: Function) => void;
export declare const MSSQLSchema: (fn: (configure: any) => void) => (target: Function) => void;
export declare const OracleSchema: (fn: (configure: any) => void) => (target: Function) => void;
export declare const PGSchema: (fn: (configure: any) => void) => (target: Function) => void;
export declare const Sqlite3Schema: (fn: (configure: any) => void) => (target: Function) => void;
export declare const DropTableIfExists: () => ClassDecorator;
export declare const Repository: (key?: string | number | symbol | undefined) => (target: any, name: string) => void;
export declare const DataTable: (name: string, engine?: string, charset?: string, collate?: string) => (target: Function) => void;
export declare const DataView: (viewName: string, sql: string) => (target: Function) => void;
export declare const TableColumn: (columnName: string, dataType: TableColumnEnum, description?: string | undefined, options?: readonly any[] | undefined) => (target: any, name: string) => void;
export declare const DefaultValueColumn: (value: DefaultValue, constraintName?: string) => (target: any, name: string) => void;
export declare const NullableColumn: () => (target: any, name: string) => void;
export declare const NotNullableColumn: () => (target: any, name: string) => void;
export declare const IndexColumn: (indexName: string, options?: TableIndex | undefined) => (target: any, name: string) => void;
export declare const UniqueColumn: (options?: UniqueIndex) => (target: any, name: string) => void;
export declare const PrimaryColumn: (columns?: string[] | undefined) => (target: any, name: string) => void;
export declare const ForeignColumn: (foreignColumn: string, foreignTable: string, inTable: string, opts?: {
    onDelete: "RESTRICT" | "CASCADE" | "SET NULL" | "NO ACTION";
    onUpdate: "RESTRICT" | "CASCADE" | "SET NULL" | "NO ACTION";
} | undefined) => (target: any, name: string) => void;
export declare const IncrementsColumn: (options?: {
    primaryKey: boolean;
} | undefined) => (target: any, name: string) => void;
export declare const IgnoreColumn: (Dbs?: string[] | undefined) => (target: any, name: string) => void;
export declare const BeforeHook: (fn: Hook) => (...args: any[]) => void;
export declare const AfterHook: (fn: Hook) => (...args: any[]) => void;
export declare const ErrorHook: (fn: Hook) => (...args: any[]) => void;
export declare const FinallyHook: (fn: Hook) => (...args: any[]) => void;
