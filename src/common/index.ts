/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   公共方法
 */

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