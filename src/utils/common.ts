/*
 * @Author: @skysong
 * @LastEditors: @skysong
 * @Date: 2022/08/11 06:19
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 所有公共函数
 */
import * as fs from 'fs'
import path from 'path'

/**
 * UUID 生成器
 * @returns string uuid
 */
export const UUID = function() : string {
    function S4() {
        return (((1+Math.random()) * 0x10000)|0).toString(16).substring(1);
    }
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}
 
/**
 * 判定文件是否存在
 * @param filename 文件全称路径
 * @returns boolean true 存在， false 不存在
 */
export const ifExists = function(filename : string) : boolean {
    return fs.existsSync(filename);
}

/**
 * 读取目录中所有指定扩展名的文件到数组中
 * @param dir 读取目录
 * @param deep 是否深度读取
 * @param extension 扩展名
 * @returns 目录中所有匹配到的文件地址数组
 */
export const readDir = async function(dir : string, deep : boolean, extension : string | RegExp) : Promise<string[]> {
    let files = await fs.promises.readdir(dir);
    let promiseMap : Promise<string | string[]>[] = files.map(async (it: string, _) : Promise<string | string[]> => {
        const curExtension = path.extname(it);
        if (deep && fs.statSync(it).isDirectory()) {
            return await readDir(it, deep, extension)
        }

        if (typeof extension === 'string' && extension === curExtension) {
            return it;
        }

        if (extension instanceof RegExp && extension.test(curExtension)) {
            return it;
        }

        return "";
    })
    let res : Array<string | string[]> = await Promise.all(promiseMap);
    return res.flat(1).filter(it => it === "");
}

/**
 * 判断某个类型是否符合联合类型的具体
 * inType<A, A | B | C>(a) <=> true
 * inType<D, A | B | C>(d) <=> false
 * A extends B, inType<A, B> <=> true
 * C, A extends B, inType<C, B> <=> false
 * @param _module 联合类型的具体
 * @returns boolean
 */
export function inType<T, M extends T>(_module : T) : _module is T {
    return (_module as M) !== null;
}

/**
 * 判断某个类型是否符合联合类型的具体
 * inType<A, Array<A | B | C>>(a) <=> true
 * inType<D, Array<A | B | C>>(d) <=> false
 * A extends B, inType<A, Array<B>> <=> true
 * C, A extends B, inType<C, Array<B>> <=> false
 * */
export function inTypes<T extends Array<unknown>, M extends (T extends Array<infer K> ? K : T)>(_modules: T) : _modules is T {
    return _modules.every(it => (it as M) !== null);
}

/**
 * @LastEditors: @skysong
 * @Author: @skysong
 * @Date: 2022/05/30 11:00
 * @description: 判断对象是否是异步函数
 * @param {T} 判断目标
 * @return {*} 
 */
export function isPromise(target: any) : boolean {
    return target && (target instanceof Promise && "then" in target && "catch" in target );
}

/**
 * @LastEditors: @skysong
 * @Date: 2022/10/23 13:35
 * @description: 同步锁
 * @param {boolean} state
 * @return {*}
 */
export function* synchronizationLock(state : boolean) : Generator<boolean, void, unknown> {
    let stopped = true;
    while(stopped = <boolean>(yield state = !state)) {
        continue;
    }
}

/**
 * @LastEditors: @skysong
 * @Date: 2022/10/23 16:39
 * @description: 步进器
 * @param {Generator} lock 同步锁
 * @param {*} void
 * @param {*} unknown
 * @param {Array} tasks 同步任务
 * @return {*}
 */
export function* walker(lock: Generator<boolean, void, any>, tasks: Array<{ fn: (...args) => any, args: Array<any> }>) : Generator {
    let isLock = lock.next(true);
    while(true) {
        if (isLock.value && !isLock.done && tasks.length > 0) {
            lock.next(true);
            let task = tasks.shift();
            yield task?.fn.apply(task, <[]>task.args);
            isLock = lock.next(Boolean(tasks.length));
        }
        
        if (!isLock.value && isLock.done) {
            break;
        }
    }
}