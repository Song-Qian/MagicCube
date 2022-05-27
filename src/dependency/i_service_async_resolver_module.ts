/**
 * Developer    :   SongQian
 * Time         :   2021-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Magic Cube 依赖注入容器
 */

import { AsyncContainerModule, interfaces } from 'inversify'

export default interface IServiceAsyncResolverModule extends AsyncContainerModule {

    get loader (): interfaces.AsyncContainerModuleCallBack;

}