/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   MagicCube 所有数据通信中心
 */

import { Server as ServerIO } from 'socket.io'
import EventEmitter from 'events'
import { UUID } from '~/utils/common'

export class CubeContact extends EventEmitter {

    constructor(configure) {
        super();
        let me = this;
        me.socketio = new ServerIO();
        me.enabled = configure.get("socket.enabled");
        me.pingTimeout = ~~configure.get("socket.pingTimeout");
        me.pingInterval = ~~configure.get("socket.pingInterval");
        me.cors = configure.get("socket.cors") ? {
            origin: configure.get("http.cors.origin") || [],
            allowedHeaders: [configure.get("http.cors.allowedHeaders")],
            credentials: configure.get("http.cors.credentials")
        } : {}
    }


    public readonly sid : string = UUID();
    private socketio !: ServerIO;
    private enabled !: boolean;
    private pingTimeout !: number;
    private pingInterval !: number;
    private maxHttpBufferSize !: number;
    private cors !: any;

    public run(server) {
        let me = this;
        if (me.enabled) {
            me.socketio.attach(server, { 
                path : "/magic-cube.io",
                serveClient: true,
                pingTimeout: me.pingTimeout,
                pingInterval: me.pingInterval,
                maxHttpBufferSize: me.maxHttpBufferSize,
                allowRequest: (req, next : Function) => next(),
                transports: ["websocket"],
                cors: me.cors
            });
    
            me.socketio.on("connection", (...args: any[]) => me.emit("connection", ...args));
            me.socketio.on("new_namespace", (...args: any[]) => me.emit("new_namespace", ...args));
        }
    }

    public dispatch(mothodName : string, ...args : any[]): void {
        let me = this;
        if (typeof me.socketio[mothodName] === "function") {
            me.socketio[mothodName].apply(me.socketio, args);
        }
    }

}