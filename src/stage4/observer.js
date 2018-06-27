import Dep from './dep'

function defineReactive(object, key, value) {
    let dep = new Dep()
    let childOb = observe(value)
    Object.defineProperty(object, key, {
        configurable: true,
        enumerable: true, 
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target)
                dep.depend()
            } 
            return value
        },
        set: function (newValue) {
            if (newValue !== value) {
                value = newValue
                dep.notify()
            }
        }
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

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
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
