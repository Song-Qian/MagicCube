/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/05/26 14:26
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 数据库ORM架构入口
 */
import { IRepository } from "./i_repository"

export default interface ISchema {
    
    Repositorys : Array<IRepository>

    Initialize(configure);
    
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;

    on(event: string | symbol, listener: (...args: any[]) => void): this;

    once(event: string | symbol, listener: (...args: any[]) => void): this;

    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;

    off(event: string | symbol, listener: (...args: any[]) => void): this;

    removeAllListeners(event?: string | symbol): this;

    setMaxListeners(n: number): this;

    getMaxListeners(): number;

    listeners(event: string | symbol): Function[];

    rawListeners(event: string | symbol): Function[];

    emit(event: string | symbol, ...args: any[]): boolean;

    listenerCount(event: string | symbol): number;

    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;

    eventNames(): (string | symbol)[];

}