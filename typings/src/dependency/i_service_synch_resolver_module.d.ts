import { ContainerModule, interfaces } from 'inversify';
export default interface IServiceSynchResolverModule extends ContainerModule {
    get loader(): interfaces.ContainerModuleCallBack;
}
