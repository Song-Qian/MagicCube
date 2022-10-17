/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/05/26 14:36
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: PG 数据库架构
 */

import { PGSchema } from '~/annotation'
import ISchema from '~/repository/i_schema'
import EventEmitter from 'events'
import Initialize from '../initialize'

@PGSchema(Initialize)
export default abstract class IPGSchema extends EventEmitter implements ISchema {
    abstract Initialize(configure: any) 
}