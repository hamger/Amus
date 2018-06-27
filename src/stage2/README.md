## amus-stage2
> 支持深层对象属性响应

阶段一只是实现了对象最外层属性的响应，如果我们要使的所有属性都得以响应，就需要对象下遍历所有的属性
```js
function defineReactive(object, key, value) {
    let dep = new Dep()
    observe(value) // 递归编列子属性
    Object.defineProperty(object, key, {
        ...
    })
}

class Observer {
    constructor(value) {
        this.value = value
        this.walk(value)
        // 标志这个对象已经被遍历过，同时保存 Observer
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable: false,
            writable: true,
            configurable: true
        })
    }
    ...
}

export default function observe (value) {
    // 非对象无需进行 defineReactive
    if (typeof value !== 'object') return
	let ob
    // 如果对象下有 Observer 则不需要再次生成 Observer（不用的引用指向同一个地址的情况）
    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else if (Object.isExtensible(value)) {
        ob = new Observer(value)
    }
    return ob
}
```
同时需要修改 Watcher ，因为阶段一里的 Watcher 适用于建议最外层属性
```js
/**
 * 解析对象属性路径（例如 obj.a.b）
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
        // expOrFn 可以是字符串或函数
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
        // getter 函数返回对象的指定属性
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
}
```