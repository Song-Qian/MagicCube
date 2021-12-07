export default function CreateReactRoot(fn: (...args: any[]) => ({
    react: any;
    router: any;
    store: any;
})): {
    kind: string;
    render: (...args: any[]) => void;
};
