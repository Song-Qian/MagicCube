/**
 * Developer    :   SongQian
 * Time         :   2019-12-12
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   同步注入依赖模块
 */

import DependencyResolver from './dependency_resolver'
import ServiceSynchResolverModule from './i_service_synch_resolver_module'

export default class SynchronousResolverNinject extends DependencyResolver {

  constructor (..._modules: ServiceSynchResolverModule[]) {
    super()
    this.AddSynchronousNinjectModels(..._modules)
  }

}
