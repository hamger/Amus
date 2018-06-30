import {Event} from "../util/event";
import observe from "../util/observer";
import Watcher from "../util/watcher";
import Computed from "../util/computed";
import {proxy} from "../util/util";
import {mergeOptions} from "./options";

let uid = 0

export class Amus extends Event {
    constructor(options) {
        super()
        this.uid = uid++
        this._init(options)
    }

    _init(options) {
        let vm = this

        vm.$options = mergeOptions(
            this.constructor.options,
            options,
            vm
        )


        for (let key in vm.$options.methods) {
            vm[key] = vm.$options.methods[key].bind(vm)
        }

        vm._data = vm.$options.data.call(vm)
        observe(vm._data)
        for (let key in vm._data) {
            proxy(vm, '_data', key)
        }

        for (let key in vm.$options.watch) {
            new Watcher(vm, () => {
                return key.split('.').reduce((obj, name) => obj[name], vm)
            }, (newValue, oldValue) => {
                vm.$options.watch[key].forEach(fnc => fnc(newValue, oldValue))
            })
        }

        for (let key in vm.$options.computed) {
            new Computed(vm, key, vm.$options.computed[key])
        }

    }
}

// 设置默认 options
Amus.options = {
    components: {},
    _base: Amus
}

/**
 * 返回一个子组件的类
 * @param {子组件配置项} extendOptions 
 */
Amus.extend = function (extendOptions) {
    // this 指向 Amus
    const Super = this

    class Sub extends Super {
        constructor(options) {
            super(options)
        }
    }

    Sub.options = mergeOptions(
        Super.options,
        extendOptions
    )

    Sub.super = Super
    Sub.extend = Super.extend

    return Sub
}
