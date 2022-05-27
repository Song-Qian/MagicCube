/**
 * Developer    :   SongQian
 * Time         :   2020-06-01
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   confingure file core
 */

import * as fs from 'fs'
import ini from 'ini'
import path from 'path'
import { ifExists } from '~/utils/common'

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
    let usePath = ifExists(path.join(rootDir, "default.ini")) ? path.join(rootDir, "default.ini") : path.join(rootDir, "./node_modules/@skysong/magic-cube", "default.ini");
    return readSysConfig(setting, usePath);
}

type Config = {
    get : (section: string) => { [ key : string] : any },
    set : (section: string, values : Map<string, any>) => void
}

//copy vue watcher . 语法访问
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
function parsePath (path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

export default function() : Config {
    const configure = initialize();
    
    return {
        get: function(section: string) : { [ key : string] : any } {
            return parsePath(section)(configure);
        },
        set: function(section: string, values: Map<string, any>) {
            let target = parsePath(section)(configure) || {};
            for (let [key, value] of values.entries()) {
                target[key] = value;
            }
        }
    }
}