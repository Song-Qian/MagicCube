import Config from './conf';
import { Cube } from './cube';
export { ApiController, beforeHook, afterHook, errorHook } from './annotation';
export { HttpService } from './services/http_service';
export { default as IServiceSynchResolverModule } from './dependency/i_service_synch_resolver_module';
export { default as IServiceAsyncResolverModule } from './dependency/i_service_async_resolver_module';
declare const _default: {
    Config: typeof Config;
    Cube: typeof Cube;
    HttpMultiplexer: {
        _service_mapping: Map<string, import("./services/http_service").HttpService<any>>;
        _server: null;
        CreateServeMultiplexer: (configure: any) => import("./services/http-multiplexer").Multiplexer;
        Setup: (server: import("@feathersjs/express").Application<any>) => void;
    };
};
export default _default;
