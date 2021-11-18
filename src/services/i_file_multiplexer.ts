/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Rest Api 接口分发器
 */
import express from '@feathersjs/express';
import IMultiplexer from './i_multiplexer'
import { HttpService } from './http_service'
import { FileMultiplexer } from '../annotation'
import IDependencyResolver from '~/dependency/i_dependency';

@FileMultiplexer()
export default abstract class IFileMultiplexer implements IMultiplexer {
   
   dependencyContainer !: IDependencyResolver;

   protected _service_mapping !: Map<string, HttpService<(...args: any[]) => { [key: string] : any }>>;

   public abstract CreateServeMultiplexer(configure): express.Application;
}