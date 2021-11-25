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

export default class RestMultiplexer extends IViewMultiplexer {
 
    constructor(render : Function) {
        super()
        const me = this;
        me._service_mapping = new Map<string, Function>([
            ["/", render]
        ]);
    }

    public CreateServeMultiplexer(configure): express.Application {
        const me = this;
        const Serve = express(Feathers());
        const render = me._service_mapping.get("/");

        if (render) {
            const { root, router, store, kind } = render();
            switch (kind) {
                case "vue" :
                    Serve.use("/", VueSSR(root, router, store));
                    break;
                case "react":
                    Serve.use("/", ReactSSR(root, router, store));
                    break;
            }
        }

        return Serve;
    }
     
}