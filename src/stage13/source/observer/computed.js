import Watcher from './watcher'

function noop() {}

let uid = 0

export default class Computed {
    constructor(vm, key, option) {
        this.uid = uid++
        this.key = key
        this.option = option
        this.vm = vm
        this._init()
    }

    _init() {
        let watcher = new Watcher(
            this.vm,
            this.option.get || noop,
            noop,
            // 告诉 Watcher 这是 lazy Watcher
            {lazy: true}
        )

        Object.defineProperty(this.vm, this.key, {
            enumerable: true,
            configurable: true,
            set: this.option.set || noop,
            get() {
                // 如果是 dirty watch 那就触发脏检查机制，更新值
                if (watcher.dirty) {
                    watcher.evaluate()
                }
                return watcher.value
            }
        })
    }
}