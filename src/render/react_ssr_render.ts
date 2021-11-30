/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Desctiption  :   React 模板SSR渲染引擎
 */

import { Request, Response, NextFunction } from "express";

export default function (path, render) {

    return function (req: Request, res: Response, next: NextFunction) {
        const context = { url: req.path }
    }
}