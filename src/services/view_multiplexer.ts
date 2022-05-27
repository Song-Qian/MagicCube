/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   view 界面模板分发器
 */
import express from '@feathersjs/express'
import Feathers from '@feathersjs/feathers'
import IViewMultiplexer from './i_view_multiplexer'
import VueSSR from '../render/vue_ssr_render'
import ReactSSR from '../render/react_ssr_render'

export default class ViewMultiplexer extends IViewMultiplexer {
 
    constructor(template: string, render : { kind: string, callback: (...args : any[]) => void }) {
        super()
        const me = this;
        me.templatePath = template;
        me.render = render;
    }

    private templatePath !: string;
    private render  !: { kind: string, callback: (...args : any[]) => void };
    public CreateServeMultiplexer(configure): express.Application {
        const me = this;
        const Serve = express(Feathers());
        const root : string = configure.get('http.server.base') || "/";

        if (me.render) {
            switch (me.render.kind) {
                case "vue" :
                    Serve.use(root, VueSSR(me.templatePath, me.render.callback.bind(me.render, configure)));
                    break;
                case "react":
                    Serve.use(root, ReactSSR(me.templatePath, me.render.callback.bind(me.render, configure)));
                    break;
            }
        }

        return Serve;
    }
     
}