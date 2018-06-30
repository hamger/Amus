
import { pushTarget, popTarget } from './dep'

const bailRE = /[^\w.$]/
export function parsePath (path) {
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

let uid = 0

export default class Watcher { 
    constructor(vm, expOrFn, callback, options) {
        this.id = uid++
        this.vm = vm
        this.callback = callback
        this.deps = []

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
            if (!this.getter) {
                this.getter = function () {}
            }
        }
        this.value = this.get()
        if (options) {
            this.lazy = !!options.lazy
        } else {
            this.lazy = false
        }
        this.dirty = this.lazy
    }

    get() {
        pushTarget(this)
        const value = this.getter.call(this.vm, this.vm)
        popTarget()
        return value
    }
    
    update() {
        if (this.lazy) {
            this.dirty = true
            return
        }
        const value = this.getter.call(this.vm, this.vm)
        const oldValue = this.value
        this.value = value
        this.callback.call(this.obj, value, oldValue)
    }

    /**
     * 脏检查机制手动触发更新函数
     */
    evaluate() {
        this.value = this.getter.call(this.vm)
        this.dirty = false
    }

    addDep (dep) {
        this.deps.push(dep)
        dep.addSub(this)
    }

    teardown () {
        let i = this.deps.length
        while (i--) this.deps[i].removeSub(this)
        this.deps = []
    }

    // 重新监听
    reset() {
        this.get()
    }
}
