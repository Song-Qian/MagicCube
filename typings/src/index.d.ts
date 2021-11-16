import Config from './conf';
import { Cube } from './cube';
import HttpMultiplexer from './services/rest_multiplexer';
export { ApiController, beforeHook, afterHook, errorHook } from './annotation';
export { HttpService } from './services/http_service';
export { default as IServiceSynchResolverModule } from './dependency/i_service_synch_resolver_module';
export { default as IServiceAsyncResolverModule } from './dependency/i_service_async_resolver_module';
declare const _default: {
    Config: typeof Config;
    Cube: typeof Cube;
    HttpMultiplexer: typeof HttpMultiplexer;
};
export default _default;
