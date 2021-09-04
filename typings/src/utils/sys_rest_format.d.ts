declare type JsonOutPut = {
    code: number;
    message: string;
    status: boolean;
    data: any;
};
export default class {
    private static readonly messageMap;
    static restFromat(code: number, message: string, data: any): JsonOutPut;
}
export {};
