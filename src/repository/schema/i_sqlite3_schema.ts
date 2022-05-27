/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/05/26 14:46
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: Sqlite3Schema 数据库架构
 */
import { Sqlite3Schema } from '~/annotation'
import ISchema from '~/repository/i_schema'
import { IRepository } from '../i_repository'

@Sqlite3Schema()
export default abstract class ISqlite3Schema  implements ISchema {

    Repository !: IRepository

    abstract Initialize(configure: any) 
    
}