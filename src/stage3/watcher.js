
import { pushTarget, popTarget } from './dep'

/**
 * Parse simple path.
 */
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

export default class Watcher { 
    constructor(vm, expOrFn, callback) {
        this.vm = vm
        this.callback = callback
        // parse expression for getter
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
            if (!this.getter) {
                this.getter = function () {}
            }
        }
        this.value = this.get()
    }

    get() {
        pushTarget(this)
        // 此时会触发对应属性的get
        const value = this.getter.call(this.vm, this.vm)
        popTarget()
        return value
    }
    
    update() {
        const value = this.getter.call(this.vm, this.vm)
        const oldValue = this.value
        this.value = value
        this.callback.call(this.obj, value, oldValue)
    }

    addDep (dep) {
        this.deps.push(dep)
    }
}
