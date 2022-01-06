/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Desctiption  :   Vue模板SSR渲染引擎
 */
import fs from 'fs'
import { join } from 'path'
import { Request, Response, NextFunction } from "express"

const entryService = (context: any, root, router, store) => {
    return new Promise((resolve, reject) => {
        const matched_success = () => {
            const matchedComponents = router.currentRoute.value.matched.flatMap(record => record.components);
            if (!matchedComponents.length) {
                return reject({ message: "no page" })
            }
            Promise.all(matchedComponents).then(() => {
                resolve(root);
            }).catch(reject)
        }
        router.isReady().then(matched_success).catch(reject);
        router.push(context.url);
    })
}

export default function(templatePath, cb) {

    return function(req : Request, res : Response, next: NextFunction) {
        const context = { url : req.path }
        const rootDir = process.cwd();
        const { root, router, store, transform } = cb();
        
        return Promise.resolve(entryService(context, root, router, store)).then((root) => {

            let promises = [
                Promise.resolve(fs.promises.readFile(join(rootDir, templatePath), { encoding: 'utf8' })),
                transform()
            ]
            Promise.all(promises).then((values) => {
                const body = values[1];
                let template = values[0] || `<!DOCTYPE html><html lang="en"><head><title>Magic Cube</title><meta charset='utf-8'/></head><body><div id='app'><!-- vue ssr output --></div></body></html>`;
                template = template.replace("<!-- vue ssr output -->", body || "");
                res.set('Content-Type', 'text/html');
                res.end(template);
            })
        }).catch(err => {
            res.set('Content-Type', 'text/html')
            const code_500 = `<!DOCTYPE html><html lang="en"><body><p>${err.message}</p></body></html>`;
            res.send(Buffer.alloc(code_500.length, code_500, 'utf8'));
            res.status(200).end();
        })
    }
}