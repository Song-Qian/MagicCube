/**
 * Developer    :   SongQian
 * Time         :   2021-08-10
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   Magic Cube 扩展注解
 */
import 'reflect-metadata'
import { Hook } from '@feathersjs/feathers'
import { HttpService } from '../services/http_service'

const defineClassMetadata = (key: Symbol, value: any) : ClassDecorator => {
    return (target: Function) => {
        Reflect.defineMetadata(key, value, target);
    }
}

const definePropertyMetadata = (key: Symbol, value: any) => {
    return (target: any, name: string) => {
        Reflect.defineMetadata(key, value, target, name);
    }
}

export const ApiController = (value: any) => {
    return defineClassMetadata(Symbol.for('magic:api'), value);
}

export const beforeHook = (fn : Hook) : ClassDecorator | MethodDecorator => {
    return (...args) => {
        const target : any = args[0];
        const name : string = args[1];
        const descriptors : any = args[2];
        if (target.prototype && target.prototype.constructor instanceof HttpService) {
            const beforeHooks = target.prototype.beforeHooks || { all: [] };
            beforeHooks.all = [...beforeHooks.all, fn]; 
            Reflect.defineProperty(target.prototype, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }

        if(target && target.constructor instanceof HttpService && name === "find") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { find: [] };
            beforeHooks.find = [...beforeHooks.find, fn];
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "get") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { get: [] };
            beforeHooks.get = [...beforeHooks.get, fn]; 
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "create") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { create: [] };
            beforeHooks.create = [...beforeHooks.create, fn]; 
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "update") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { update: [] };
            beforeHooks.update = [...beforeHooks.update, fn]; 
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "patch") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { patch: [] };
            beforeHooks.patch = [...beforeHooks.patch, fn]; 
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "remove") {
            const beforeHooks = Reflect.get(target, "beforeHooks", target) || { remove: [] };
            beforeHooks.remove = [...beforeHooks.remove, fn]; 
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...beforeHooks })
            })
        }
    }
}

export const afterHook = (fn : Hook) : ClassDecorator | MethodDecorator => {
    return (...args) => {
        const target : any = args[0];
        const name : string = args[1];
        const descriptors : any = args[2];
        if (target.prototype && target.prototype.constructor instanceof HttpService) {
            const afterHooks = target.prototype.afterHooks || { all: [] };
            afterHooks.all = [...afterHooks.all, fn]; 
            Reflect.defineProperty(target.prototype, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }

        if(target && target.constructor instanceof HttpService && name === "find") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { find: [] };
            afterHooks.find = [...afterHooks.find, fn];
            Reflect.defineProperty(target, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "get") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { get: [] };
            afterHooks.get = [...afterHooks.get, fn]; 
            Reflect.defineProperty(target, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "create") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { create: [] };
            afterHooks.create = [...afterHooks.create, fn]; 
            Reflect.defineProperty(target, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "update") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { update: [] };
            afterHooks.update = [...afterHooks.update, fn]; 
            Reflect.defineProperty(target, "beforeHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "patch") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { patch: [] };
            afterHooks.patch = [...afterHooks.patch, fn]; 
            Reflect.defineProperty(target, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "remove") {
            const afterHooks = Reflect.get(target, "afterHooks", target) || { remove: [] };
            afterHooks.remove = [...afterHooks.remove, fn]; 
            Reflect.defineProperty(target, "afterHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...afterHooks })
            })
        }
    }
}

export const errorHook = (fn : Hook) : ClassDecorator | MethodDecorator => {
    return (...args) => {
        const target : any = args[0];
        const name : string = args[1];
        const descriptors : any = args[2];
        if (target.prototype && target.prototype.constructor instanceof HttpService) {
            const errorHooks = target.prototype.errorHooks || { all: [] };
            errorHooks.all = [...errorHooks.all, fn]; 
            Reflect.defineProperty(target.prototype, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }

        if(target && target.constructor instanceof HttpService && name === "find") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { find: [] };
            errorHooks.find = [...errorHooks.find, fn];
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "get") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { get: [] };
            errorHooks.get = [...errorHooks.get, fn]; 
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "create") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { create: [] };
            errorHooks.create = [...errorHooks.create, fn]; 
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "update") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { update: [] };
            errorHooks.update = [...errorHooks.update, fn]; 
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "patch") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { patch: [] };
            errorHooks.patch = [...errorHooks.patch, fn]; 
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }
        
        if(target && target.constructor instanceof HttpService && name === "remove") {
            const errorHooks = Reflect.get(target, "errorHooks", target) || { remove: [] };
            errorHooks.remove = [...errorHooks.remove, fn]; 
            Reflect.defineProperty(target, "errorHooks", {
                configurable: false,
                writable: true,
                enumerable: false,
                value: () => ({ ...errorHooks })
            })
        }
    }
}