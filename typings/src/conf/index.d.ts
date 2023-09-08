declare type Config = {
    get: (section: string) => {
        [key: string]: any;
    };
    set: (section: string, values: Map<string, any>) => void;
};
export default function (): Config;
export {};
