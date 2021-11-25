/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Desctiption  :   React 根实例工厂函数
 */

export default function CreateReactRoot(fn: () => ({ react, router, store })): () => void {
    return function() {
        const { react : root, router, store } = fn();

        return { kind: "react", root, router, store};
    }
}