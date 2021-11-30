/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Rest Api 接口分发器
 */
import express from '@feathersjs/express'
import IMultiplexer from './i_multiplexer'
import { ViewMultiplexer } from '../annotation'
import IDependencyResolver from '~/dependency/i_dependency';

@ViewMultiplexer()
export default abstract class IViewMultiplexer implements IMultiplexer {

   dependencyContainer !: IDependencyResolver;

   protected _service_mapping !: Map<string, { kind: string, render: (ssr: boolean) => void }>;

   public abstract CreateServeMultiplexer(configure): express.Application;
}