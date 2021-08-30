/**
 * Developer    :   SongQian
 * Time         :   2021-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   同步注入依赖模块
 */

import DependencyResolver from './dependency_resolver'
import ServiceAsyncResolverModule from './i_service_async_resolver_module'

export default class AsynchronousResolverNinject extends DependencyResolver {

  constructor (..._modules: ServiceAsyncResolverModule[]) {
    super()
    // tslint:disable-next-line: no-floating-promises
    this.AddAsynchronousModules(..._modules)
  }

}
