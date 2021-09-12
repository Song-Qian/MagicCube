/** 
 * Developer    :   SongQian
 * Time         :   2020-06-07
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   feather restful api 模式接口出数据封装,返回前端统一格式数据，用于标准数据交互.
 */

 import { Hook, HookContext } from '@feathersjs/feathers'
 import RestfulFormat from '~/utils/sys_rest_format'
 
  export default () : Hook => {
      return (context : HookContext) => {
        const { statusCode, result, service } = context;
        const messageMap = service.raw;
        const newData = RestfulFormat.restFromat(statusCode || 500, messageMap.get(statusCode), result);
        context.result = newData;
        return context;
      }
  }