export default function CreateVueRoot(fn: (ssr: boolean) => ({
    vue: any;
    router: any;
    store: any;
})): {
    kind: string;
    render: () => void;
};
