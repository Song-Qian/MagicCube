/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Desctiption  :   React 模板SSR渲染引擎
 */
import fs from 'fs'
import { join } from 'path'
import { Request, Response, NextFunction } from "express"
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

const entryService = (context: any, root, router, store) => {
    return new Promise((resolve, reject) => {
        resolve(StaticRouter({ basename: "", children: root, location: context.url }))
    })
}

export default function (templatePath, render) {

    return function (req: Request, res: Response, next: NextFunction) {
        const context = { url: req.path }
        const rootDir = process.cwd();
        const { root, router, store } = render();

        entryService(context, root, router, store).then((root: any) => {

            let promises = [
                Promise.resolve(fs.promises.readFile(join(rootDir, templatePath), { encoding: 'utf8' })),
                Promise.resolve(renderToString(root))
            ]
    
            Promise.all(promises).then((values) => {
                const body = values[1];
                let template = values[0] ||`<!DOCTYPE html><html lang="en"><head><title>Magic Cube</title><meta charset='utf-8'/></head><body><div id='app'><!-- react ssr output --></div></body></html>`;
                template = template.replace("<!-- react ssr output -->", body || "");
                res.set('Content-Type', 'text/html');
                res.end(template);
            })
        })

    }
}