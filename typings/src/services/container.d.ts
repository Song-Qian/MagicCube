export default class Container<T> {
    private readonly multiplexerContainer;
    private static instance;
    static getInstance<T>(): Container<any>;
    get size(): number;
    set(key: string, value: any): Map<string, T>;
    has(key: string): boolean;
    get(key: string): T | undefined;
    delete(key: string): boolean;
    clear(): void;
}
