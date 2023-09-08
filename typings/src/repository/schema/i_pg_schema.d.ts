/// <reference types="node" />
import ISchema from "../i_schema";
import EventEmitter from 'events';
export default abstract class IPGSchema extends EventEmitter implements ISchema {
    abstract Initialize(configure: any): any;
}
