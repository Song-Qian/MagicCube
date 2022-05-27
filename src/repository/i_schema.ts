/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/05/26 14:26
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 数据库ORM架构入口
 */
import { IRepository } from "./i_repository"

export default interface ISchema {

    Repository : IRepository

    Initialize(configure);
}