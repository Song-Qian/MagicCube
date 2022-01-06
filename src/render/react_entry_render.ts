/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Desctiption  :   React 根实例工厂函数
 */

export default function CreateReactRoot(fn: (...args : any[]) => ({ react, router, store, transform : Promise<string> | ((...args : any[]) => Promise<string>)  })): { kind : string, callback : (...args : any[]) => void } {
    const render_instance = {
        kind : 'react',
        callback : function(iniConfig) {
            const { react : root, router, store, transform } = fn(iniConfig);
            
            let transformRender = ("then" in transform && "catch" in transform && transform instanceof Promise ? (...args : any[]) => transform : transform);
    
            return { root, router, store, transform : transformRender };
        }
    }
    
    return render_instance;
}