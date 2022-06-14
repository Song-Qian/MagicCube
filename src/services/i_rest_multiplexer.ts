/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Rest Api 接口分发器
 */
import express from '@feathersjs/express';
import IMultiplexer from './i_multiplexer'
import { HttpService } from './http_service'
import { RestMultiplexer } from '../annotation'
import IDependencyResolver from '~/dependency/i_dependency';

@RestMultiplexer()
export default abstract class IRestMultiplexer implements IMultiplexer {

    protected _service_mapping !: Map<string, HttpService<(...args: any[]) => { [key: string] : any }>>;

    public abstract CreateServeMultiplexer(configure): express.Application;
}