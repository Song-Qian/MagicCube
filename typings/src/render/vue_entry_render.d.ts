export default function CreateVueRoot(fn: (...args: any[]) => ({
    vue: any;
    router: any;
    store: any;
})): {
    kind: string;
    render: (...args: any[]) => void;
};
