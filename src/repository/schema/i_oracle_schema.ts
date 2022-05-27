/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/05/26 14:40
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: Orache 数据库架构
 */
import { OracleSchema } from '~/annotation'
import ISchema from '~/repository/i_schema'
import { IRepository } from '../i_repository'

@OracleSchema()
export default abstract class IOracleSchema implements ISchema {

    Repository !: IRepository

    abstract Initialize(configure: any) 

}