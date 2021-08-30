/**
 * Developer    :   SongQian
 * Time         :   2021-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Magic Cube 同步
 */

import { ContainerModule, interfaces } from 'inversify'

export default interface IServiceSynchResolverModule extends ContainerModule {
 
    get loader (): interfaces.ContainerModuleCallBack;
 
}