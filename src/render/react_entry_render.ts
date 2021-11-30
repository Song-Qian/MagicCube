/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Desctiption  :   React 根实例工厂函数
 */

export default function CreateReactRoot(fn: (ssr: boolean) => ({ react, router, store })): { kind : string, render : () => void } {
    const render_instance = {
        kind : 'react',
        render : function() {
            const { react : root, router, store } = fn(true);
    
            return { root, router, store};
        }
    }
    
    return render_instance;
}