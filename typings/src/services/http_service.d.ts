import { Params, Paginated, Id, ServiceMethods, HookMap } from '@feathersjs/feathers';
export declare abstract class HttpService<T extends {
    [key: string]: any;
}> implements ServiceMethods<T> {
    get afterHooks(): HookMap<unknown>;
    get beforeHooks(): HookMap<unknown>;
    get errorHooks(): HookMap<unknown>;
    get finallyHooks(): HookMap<unknown>;
    private _raw;
    get raw(): {
        code: number;
        map: Map<number, any>;
    };
    set raw(val: {
        code: number;
        map: Map<number, any>;
    });
    set state(code: number);
    abstract find(params?: Params): Promise<T | T[] | Paginated<T>>;
    abstract get(id: Id, params?: Params): Promise<T>;
    abstract create(data: Partial<T> | Array<Partial<T>>, params?: Params): Promise<T | T[]>;
    abstract update(id: Id, data: T, params?: Params): Promise<T | T[]>;
    abstract patch(id: Id, data: Partial<T>, params?: Params): Promise<T | T[]>;
    abstract remove(id: Id, params?: Params): Promise<T | T[]>;
}
