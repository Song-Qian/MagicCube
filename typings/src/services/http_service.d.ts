import { Params, Paginated, Id, ServiceMethods, HookMap } from '@feathersjs/feathers';
export declare abstract class HttpService<T extends {
    [key: string]: any;
}> implements ServiceMethods<T> {
    protected get afterHooks(): HookMap<unknown>;
    protected get beforeHooks(): HookMap<unknown>;
    protected get errorHooks(): HookMap<unknown>;
    private _raw;
    get raw(): any;
    set raw(val: any);
    abstract find(params?: Params): Promise<T | T[] | Paginated<T>>;
    abstract get(id: Id, params?: Params): Promise<T>;
    abstract create(data: Partial<T> | Array<Partial<T>>, params?: Params): Promise<T | T[]>;
    abstract update(id: Id, data: T, params?: Params): Promise<T | T[]>;
    abstract patch(id: Id, data: Partial<T>, params?: Params): Promise<T | T[]>;
    abstract remove(id: Id, params?: Params): Promise<T | T[]>;
}