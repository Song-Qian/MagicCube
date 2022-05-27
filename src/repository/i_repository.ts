/*
 * @Author: SongQian
 * @Date: 2022-04-17 17:29:43
 * @Description: 数据库业务操作封装接口
 * @eMail: onlylove1172559463@vip.qq.com
 */
import { Knex } from "knex"

export interface IRepository {
    dbContext : Knex;
}
