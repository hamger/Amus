import Dep from './dep'

function defineReactive(object, key, value) {
    let dep = new Dep()
    observe(value)
    Object.defineProperty(object, key, {
        configurable: true,
        enumerable: true,
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target)
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
    }

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }

}

export default function observe (value) {
	let ob
    if (typeof value !== 'object') return
    else {
        ob = new Observer(value)
    }
    return ob
}
