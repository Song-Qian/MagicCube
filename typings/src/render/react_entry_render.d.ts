export default function CreateReactRoot(fn: (ssr: boolean) => ({
    react: any;
    router: any;
    store: any;
})): {
    kind: string;
    render: () => void;
};
