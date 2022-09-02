/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/11 06:19
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 分发器的抽象接口.
 */
import express from '@feathersjs/express'

export default interface IMultiplexer {
    CreateServeMultiplexer(configure) : express.Application;
}