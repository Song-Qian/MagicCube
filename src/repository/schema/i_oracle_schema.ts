/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/05/26 14:40
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: Orache 数据库架构
 */

import { OracleSchema } from '~/annotation'
import ISchema from '~/repository/i_schema'
import EventEmitter from 'events'
import Initialize from '../initialize'

@OracleSchema(Initialize)
export default abstract class IOracleSchema extends EventEmitter implements ISchema {
    abstract Initialize(configure: any) 
}