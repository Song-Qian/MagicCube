/*
 * @Author: @skysong
 * @Date: 2023-03-21 14:08:50
 * @LastEditors: @skysong
 * @LastEditTime: 2023-05-19 13:34:21
 * @FilePath: /MagicCube/src/services/file_service.ts
 * @Description: 这是一个文件上传，下载处理类
 * @eMail: songqian6110@dingtalk.com
 */
import { injectable } from "inversify"
import { Request, Response } from "express"

@injectable()
export abstract class FileService {

    public getFilename ?: (req: Request, file: any, cb: Function) => void;

    public getDestination ?: (req: Request, file: any, cb: Function) => void;

    public abstract do_upload(req: Request, res: Response);

    public abstract do_download(req: Request, res: Response);
}