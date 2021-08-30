/**
 * Developer    :   SongQian
 * Time         :   2021-08-10
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Controller 控制器基类
 */
import { Params, Paginated, Id, ServiceMethods, Hook, HookMap } from '@feathersjs/feathers'
import { injectable } from 'inversify';

@injectable()
export abstract class HttpService<T extends { [key : string] : any }> implements ServiceMethods<T> {

  protected abstract get afterHooks() : HookMap<unknown>;
  protected abstract get beforeHooks() : HookMap<unknown>;
  protected abstract get errorHooks() : HookMap<unknown>;

  protected _raw : any;

  public abstract get raw();

  public abstract set raw(val : any);

  public abstract find(params?: Params) : Promise<T | T[] | Paginated<T>>;

  public abstract get (id: Id, params?: Params): Promise<T>;

  public abstract create(data: Partial<T> | Array<Partial<T>>, params?: Params) : Promise<T | T[]>;

  public abstract update(id: Id, data: T, params?: Params) : Promise<T | T[]>;

  public abstract patch(id: Id, data: Partial<T>, params?: Params) : Promise<T | T[]>;

  public abstract remove(id: Id, params?: Params) : Promise<T | T[]>;
}