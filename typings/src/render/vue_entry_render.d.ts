export default function CreateVueRoot(fn: (...args: any[]) => ({
    vue: any;
    router: any;
    store: any;
    transform: Promise<string> | ((...args: any[]) => Promise<string>);
})): {
    kind: string;
    callback: (...args: any[]) => void;
};
