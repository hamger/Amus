import {Event} from "../util/event";
import observe from "../util/observer";
import Watcher from "../util/watcher";
import Computed from "../util/computed";

// 代理到 target 对象
export function proxy(target, sourceKey, key) {
    const sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get() {
        },
        set() {
        }
    }
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

let uid = 0

export class Amus extends Event {
    constructor(options) {
        super()
        this._init(options)
    }

    _init(options) {
        let vm = this
        vm.uid = uid++

        if (options.methods) {
            for (let key in options.methods) {
                vm[key] = options.methods[key].bind(vm)
            }
        }
        // 先将 vm._data 转变为可监听结构
        vm._data = options.data.call(vm)
        observe(vm._data)
        // 然后代理到 vm 对象下，直接赋值会使可监听结构被破坏
        for (let key in vm._data) {
            proxy(vm, '_data', key)
        }

        for (let key in options.watch) {
            new Watcher(vm, key, options.watch[key])
        }

        for (let key in options.computed) {
            new Computed(vm, key, options.computed[key])
        }

    }
}

