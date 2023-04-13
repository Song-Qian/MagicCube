/*
 * @Author: @skysong
 * @Date: 2023-03-21 14:08:50
 * @LastEditors: @skysong
 * @LastEditTime: 2023-04-13 15:05:39
 * @FilePath: /MagicCube/src/services/file_service.ts
 * @Description: 这是一个文件上传，下载处理类
 * @eMail: songqian6110@dingtalk.com
 */
import { injectable } from "inversify"
import { Request, Response, NextFunction } from "express"

@injectable()
export default abstract class FileService {

    public abstract do_upload(res: Request, rep: Response);

    public abstract do_download(res: Request, rep: Response);
}