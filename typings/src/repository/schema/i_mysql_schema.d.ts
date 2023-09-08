/// <reference types="node" />
import ISchema from "../i_schema";
import EventEmitter from "events";
export default abstract class IMySQLSchema extends EventEmitter implements ISchema {
    abstract Initialize(configure: any): any;
}