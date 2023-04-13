/*
 * @Author: @skysong
 * @LastEditors: @skysong
 * @Date: 2020/06/01 06:19
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: Rest Api 接口分发器
 */
import express from '@feathersjs/express';
import IMultiplexer from './i_multiplexer'
import Container from './container'
import { HttpService } from './http_service'
import { RestMultiplexer } from '../annotation'

@RestMultiplexer()
export default abstract class IRestMultiplexer implements IMultiplexer {

    protected _service_mapping !: Container<HttpService<(...args: any[]) => { [key: string] : any }>>;

    public abstract CreateServeMultiplexer(configure): express.Application;
}