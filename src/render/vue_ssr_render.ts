/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Desctiption  :   Vue模板SSR渲染引擎
 */
import { Request, Response, NextFunction } from "express"
import { renderToString } from '@vue/server-renderer'

const entryService = function (context: any, root, router, store) {
    return new Promise((resolve, reject) => {
        // const ready = router.onReady || router.isReady;
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
    })
}

export default function(root, router, store) {

    return function(req : Request, res : Response, next: NextFunction) {
        const context = { url : req.path }
    
        entryService(context, root, router, store).then(
            (root : any) => {
                // const ssr_server =  fs.readFileSync(resolve('./lib', 'vue-ssr-server-bundle.json'), "utf8");
                // const ssr_client = fs.readFileSync(resolve('./lib', 'vue-ssr-client-manifest.json'), "utf8");
                // const renderer = createBundleRenderer(JSON.parse(ssr_server), {
                //     template: `<!DOCTYPE html><html lang="en"><head><title>Magic Cube</title><meta charset='utf-8'/><meta content='width=width-device, initial-scale=1, user-scalable=no, target-densitydpi=high-dpi' />{{{ renderStyles() }}}</head><body><!--vue-ssr-outlet-->{{{ renderScripts() }}}</body></html>`,
                //     inject: true,
                //     runInNewContext: true,
                //     clientManifest: JSON.parse(ssr_client)
                // })

                renderToString(root).then(body => {
                    res.set('Content-Type', 'text/html');
                    res.end(`<!DOCTYPE html><html lang="en"><head><title>Magic Cube</title><meta charset='utf-8'/>{{{ renderStyles() }}}</head><body>${body}{{{ renderScripts() }}}</body></html>`);
                })

                // if (root.code === 404) {
                //     res.status(404).end('no page')
                //     return
                // }
                // renderer.renderToString(context, (err: any, html: any) => {
                //     if (err) {
                //         res.status(500).end('Internal Server Error')
                //         return
                //     }
                //     res.set('Content-Type', 'text/html')
                //     res.send(Buffer.alloc(html.length, html, 'utf8'))
                //     res.status(200).end()
                // })
            },
            (err: any) => {
                res.set('Content-Type', 'text/html')
                const code_500 = `<!DOCTYPE html><html lang="en"><head><title>Hello</title></head><body><p>${err.message}</p></body></html>`;
                res.send(Buffer.alloc(code_500.length, code_500, 'utf8'));
                res.status(200).end()
            }
        )
    }
}