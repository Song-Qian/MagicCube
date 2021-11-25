export default function CreateVueRoot(fn: () => ({
    vue: any;
    router: any;
    store: any;
})): () => void;
