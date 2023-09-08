export declare const UUID: () => string;
export declare const ifExists: (filename: string) => boolean;
export declare const readDir: (dir: string, deep: boolean, extension: string | RegExp) => Promise<string[]>;
export declare function inType<T, M extends T>(_module: T): _module is T;
export declare function inTypes<T extends Array<unknown>, M extends (T extends Array<infer K> ? K : T)>(_modules: T): _modules is T;
export declare function isPromise(target: any): boolean;
export declare function synchronizationLock(state: boolean): Generator<boolean, void, unknown>;
export declare function walker(lock: Generator<boolean, void, any>, tasks: Array<{
    fn: (...args: any[]) => any;
    args: Array<any>;
}>): Generator;
