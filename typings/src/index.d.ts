import Config from './conf';
import { Cube } from './cube';
export { ApiController, beforeHook, afterHook, errorHook } from './annotation';
export { HttpService } from './services/http_service';
export { default as IServiceSynchResolverModule } from './dependency/i_service_synch_resolver_module';
export { default as IServiceAsyncResolverModule } from './dependency/i_service_async_resolver_module';
export { default as IRestMultiplexer } from './services/i_rest_multiplexer';
export { default as IViewMultiplexer } from './services/i_view_multiplexer';
export { default as IFileMultiplexer } from './services/i_file_multiplexer';
export { default as CreateVueRoot } from './render/vue_entry_render';
export { default as CreateReactRoot } from './render/react_entry_render';
declare const _default: {
    Config: typeof Config;
    Cube: typeof Cube;
};
export default _default;
