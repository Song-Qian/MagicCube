/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Magic Cube Project Start
 */
import Config from './conf'
import { Cube } from './cube'
import HttpMultiplexer from './services/http-multiplexer'

export { ApiController, beforeHook, afterHook, errorHook } from './annotation'
export { HttpService } from './services/http_service'
export { default as IServiceSynchResolverModule } from './dependency/i_service_synch_resolver_module'
export { default as IServiceAsyncResolverModule } from './dependency/i_service_async_resolver_module'

export default { Config, Cube, HttpMultiplexer }