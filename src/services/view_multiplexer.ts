/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   view 界面模板分发器
 */
import { HttpService } from './http_service'

import express from '@feathersjs/express'
import Feathers from '@feathersjs/feathers'
import IViewMultiplexer from './i_view_multiplexer'

export default class RestMultiplexer extends IViewMultiplexer {
 
    constructor() {
        super()
        const me = this;
        me._service_mapping = new Map<string, HttpService<(...args: any[]) => { [key: string] : any }>>(); 
    }

    public CreateServeMultiplexer(configure): express.Application {
        const me = this;
        return express(Feathers());
    }
     
}