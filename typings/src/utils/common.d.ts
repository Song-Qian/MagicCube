export declare const UUID: () => string;
export declare const ifExists: (filename: string) => boolean;
export declare const readDir: (dir: string, deep: boolean, extension: string | RegExp) => Promise<string[]>;
