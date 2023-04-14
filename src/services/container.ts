/*
 * @Author: @skysong
 * @Date: 2023-04-13 10:03:51
 * @LastEditors: @skysong
 * @LastEditTime: 2023-04-13 17:27:13
 * @FilePath: /MagicCube/src/services/container.ts
 * @Description: 分发器容器
 * @eMail: onlylove1172559463@vip.qq.com
 */

export default class Container<T> {

    private readonly multiplexerContainer : Map<string, T> = new Map();

    private static instance : Container<any>;

    public static getInstance<T>() {
        if (!Container.instance) {
            Container.instance = new Container<T>();
            Object.freeze(Container.instance);
        }
        return Container.instance;
    }

    public get size() {
        return this.multiplexerContainer.size;
    }

    public set(key: string, value: any) {
        return this.multiplexerContainer.set(key, value);
    }

    public has(key: string) {
        return this.multiplexerContainer.has(key);
    }

    public get(key: string) {
        return this.multiplexerContainer.get(key);
    }

    public delete(key: string) {
        return this.multiplexerContainer.delete(key);
    }

    public clear() {
        this.multiplexerContainer.clear();
    }
}