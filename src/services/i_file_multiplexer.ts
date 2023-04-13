/*
 * @Author: @skysong
 * @LastEditors: @skysong
 * @Date: 2020-06-01 06:19
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: Rest Api 接口分发器
 */
import express from '@feathersjs/express'
import IMultiplexer from './i_multiplexer'
import Container from './container'
import { FileMultiplexer } from '../annotation'
import FileService from './file_service'

@FileMultiplexer()
export default abstract class IFileMultiplexer implements IMultiplexer {

   protected _service_mapping !: Container<FileService>;

   public abstract CreateServeMultiplexer(configure): express.Application;
}