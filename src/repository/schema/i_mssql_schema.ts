/*
 * @Author: @skysong
 * @LastEditors: @skysong
 * @Date: 2022/05/26 14:39
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: MSSQL 数据库架构
 */

import { MSSQLSchema } from '~/annotation'
import ISchema from '~/repository/i_schema'
import Initialize from '../initialize'
import EventEmitter from "events"

@MSSQLSchema(Initialize)
export default abstract class IMSSQLSchema extends EventEmitter implements ISchema {
    abstract Initialize(configure: any)
}