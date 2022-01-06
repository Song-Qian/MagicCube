/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Desctiption  :   Vue 根实例工厂函数
 */

export default function CreateVueRoot(fn : (...args : any[]) => ({ vue, router, store, transform : Promise<string> | ((...args : any[]) => Promise<string>) })) : { kind : string, callback : (...args : any[]) => void } {
    const render_instance = {
        kind : 'vue',
        callback : function(iniConfig) {
            const { vue : root, router, store, transform } = fn(iniConfig);

            let transformRender = ("then" in transform && "catch" in transform && transform instanceof Promise ? (...args : any[]) => transform : transform);
    
            return { root, router, store, transform : transformRender };
        }
    }
    
    return render_instance;
}