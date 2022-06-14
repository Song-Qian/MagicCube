/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   分发器的抽象接口
 */

import express from '@feathersjs/express'
import IDependencyResolver from '~/dependency/i_dependency';

export default interface IMultiplexer {
    CreateServeMultiplexer(configure) : express.Application;
}