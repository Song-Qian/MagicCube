/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Desctiption  :   Vue 根实例工厂函数
 */

export default function CreateVueRoot(fn : () => ({ vue, router, store })) : () => void {
    return function() {
        const { vue : root, router, store } = fn();

        return { kind: "vue", root, router, store};
    }
}