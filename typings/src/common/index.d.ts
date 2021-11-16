export declare function inType<T, M extends T>(_module: T): _module is T;
export declare function inTypes<T extends Array<unknown>, M extends (T extends Array<infer K> ? K : T)>(_modules: T): _modules is T;
