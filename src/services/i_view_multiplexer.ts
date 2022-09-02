/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/11 06:19
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: Rest Api 接口分发器
 */
import express from '@feathersjs/express'
import IMultiplexer from './i_multiplexer'
import { ViewMultiplexer } from '../annotation'

@ViewMultiplexer()
export default abstract class IViewMultiplexer implements IMultiplexer {

   protected _service_mapping !: Map<string, any>;

   public abstract CreateServeMultiplexer(configure): express.Application;
}