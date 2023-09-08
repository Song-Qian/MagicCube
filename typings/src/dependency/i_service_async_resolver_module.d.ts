import { AsyncContainerModule, interfaces } from 'inversify';
export default interface IServiceAsyncResolverModule extends AsyncContainerModule {
    get loader(): interfaces.AsyncContainerModuleCallBack;
}
