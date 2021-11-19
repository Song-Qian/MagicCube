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

  public get afterHooks() : HookMap<unknown> {
    return {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
  }

  public get beforeHooks() : HookMap<unknown> {
    return {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
  }

  public get errorHooks() : HookMap<unknown> {
    return {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
  }

  private _raw : any;

  public get raw() {
    return this._raw;
  }

  public set raw(val : any) {
    this._raw = val;
  }

  public abstract find(params?: Params) : Promise<T | T[] | Paginated<T>>;

  public abstract get (id: Id, params?: Params): Promise<T>;

  public abstract create(data: Partial<T> | Array<Partial<T>>, params?: Params) : Promise<T | T[]>;

  public abstract update(id: Id, data: T, params?: Params) : Promise<T | T[]>;

  public abstract patch(id: Id, data: Partial<T>, params?: Params) : Promise<T | T[]>;

  public abstract remove(id: Id, params?: Params) : Promise<T | T[]>;
}