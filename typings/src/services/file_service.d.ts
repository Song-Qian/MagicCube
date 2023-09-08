import { Request, Response } from "express";
export declare abstract class FileService {
    getFilename?: (req: Request, file: any, cb: Function) => void;
    getDestination?: (req: Request, file: any, cb: Function) => void;
    abstract do_upload(req: Request, res: Response): any;
    abstract do_download(req: Request, res: Response): any;
}
