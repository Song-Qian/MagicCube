export default function CreateReactRoot(fn: () => ({
    react: any;
    router: any;
    store: any;
})): () => void;
