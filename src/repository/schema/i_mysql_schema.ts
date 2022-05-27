/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/05/26 14:39
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: MySQL 数据库架构
 */
import { MySqlSchema } from '~/annotation'
import ISchema from '~/repository/i_schema'
import { IRepository } from '../i_repository'

@MySqlSchema()
export default abstract class IMySQLSchema implements ISchema {

    Repository !: IRepository

    abstract Initialize(configure: any) 

}