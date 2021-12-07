/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Desctiption  :   Vue 根实例工厂函数
 */

export default function CreateVueRoot(fn : (...args : any[]) => ({ vue, router, store })) : { kind : string, render : (...args : any[]) => void } {
    const render_instance = {
        kind : 'vue',
        render : function(iniConfig) {
            const { vue : root, router, store } = fn(iniConfig);
    
            return { root, router, store};
        }
    }
    
    return render_instance;
}