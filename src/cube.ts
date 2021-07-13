/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Magic Cube
 */

import express from 'express'
import conf from './conf'
import tortoiseshell from './helmet'

export default class Cube {

    constructor() {
        this.server = express();
    }

    private server !: express.Express;

    public get configure() {
        return conf();
    }

    public Run(): void {
        tortoiseshell(this.configure.get("http.helmet"), this.server)
    }

}