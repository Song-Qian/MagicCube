/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   confingure file core
 */

import * as fs from 'fs'
import ini from 'ini'
import path from 'path'

//判断配置文件是否存在
const ifExists = function(filename : string) : boolean {
    return fs.existsSync(filename);
}

//加载配置文件
const readSysConfig = function(target: { [key: string]: any }, filepath : string) : any {
    if (ifExists(filepath)) {
        let dest = ini.parse(fs.readFileSync(filepath, 'utf-8'));
        return Object.assign(target, dest.include && dest.include.path ? readSysConfig(target, path.join(filepath, dest.include.path)) : dest);
    }
    return target;
}

//配置文件初始化
const initialize = function() : any {
    let rootDir = process.cwd();
    let setting = {};
    let usePath = ifExists(path.join(rootDir, "conf.ini")) ? path.join(rootDir, "conf.ini") : path.join(__dirname, "../../default.ini");
    return readSysConfig(setting, usePath);
}

type Config = {
    get : (section: string) => { [ key : string] : any },
    set : (section: string, values : Map<string, any>) => void
}

export default function() : Config {
    const configure = initialize();
    
    return {
        get: function(section: string) : { [ key : string] : any } {
            return configure[section];
        },
        set: function(section: string, list: Map<string, any>) {
            configure[section] = configure[section] || {};
            for (let [key, value] of list.entries()) {
                configure[section][key] = value;
            }
        }
    }
}