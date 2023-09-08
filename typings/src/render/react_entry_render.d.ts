export default function CreateReactRoot(fn: (...args: any[]) => ({
    react: any;
    router: any;
    store: any;
    transform: Promise<string> | ((...args: any[]) => Promise<string>);
})): {
    kind: string;
    callback: (...args: any[]) => void;
};
