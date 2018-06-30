## amus-stage5
> 支持数组响应

到阶段四我们已经支持了针对对象的监听，但是还没有实现数组变更的响应，例如下面代码就无法实现响应
```js
let object = {
    arrayTest: [1, 2, 3, 4, 5]
}
observe(object)
let watcher = new Watcher(object, function () {
    return this.arrayTest.reduce((sum, num) => sum + num)
}, function (newValue, oldValue) {
    console.log(`监听函数，数组内所有元素 = ${newValue}`)
})
object.arrayTest.push(10)
```

### observer
要想支持组数类型的响应，首先需要对数组的每一项进行观察。
```js
function defineReactive(object, key, value) {
    let dep = new Dep()
    let childOb = observe(value)
    Object.defineProperty(object, key, {
        configurable: true,
        enumerable: true, 
        get: function () {
            if (Dep.target) {
                dep.depend() // 收集 dep 和 watcher
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
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
        this.dep = new Dep() // 支持 Observer 实例调用 dep 的方法
		def(value, '__ob__', this)
		// 和对象处理不同的是，数组长度不能确定，一开始定义索引的 get/set 没有意义，所以这里并没有对索引使用 defineReactive
        if (Array.isArray(value)) {
            this.observeArray(value)
        } else {
            this.walk(value)
        }
	}

    walk(obj) {
        // Object.keys() 对数组也有作用，输出["0", "1", ...]
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }

    /**
     * 观察数组的每一项
     */
    observeArray (items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }
}
...
/**
 * 在变更数组元素时收集对数组元素的依赖关系，因为
 * 我们不能利用属性的 getter 来拦截对数组元素的访问
 */
function dependArray (value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
      e = value[i]
      e && e.__ob__ && e.__ob__.dep.depend()
      if (Array.isArray(e)) {
        dependArray(e)
      }
    }
}
```

### array
当我们调用数组下的方法时，会对应原数组造成影响：数组长度以及元素顺序发生变化。此时我们希望触发数据响应，因此我们需要自定义数组的操作方法，并拦截数组的原生方法。
```js
// array.js
import { def } from './util'

const arrayProto = Array.prototype
// Object.create 返回一个具有数组原型的新对象
export const arrayMethods = Object.create(arrayProto);

const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

/**
 * 拦截突变方法并发出事件
 */
methodsToPatch.forEach(function(method) {
    const original = arrayProto[method] // 劫持数组的原生方法

    const mutator = function (...args) {
        const result = original.apply(this, args)
        const ob = this.__ob__
        let inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        // 如果新增了元素，对该元素进行观察
        if (inserted) ob.observeArray(inserted)
        ob.dep.notify()
        return result
    }

    def(arrayMethods, method, mutator)
})

// 当根据索引给数组赋值时（array[1] = 10），手动调用该函数，监听数组并触发回调
arrayMethods.$apply = function () {
    this.__ob__.observeArray(this)
    this.__ob__.dep.notify()
}
```
然后需要应用在 observer.js 中，覆盖原生的数组方法
```js
// observer.js

/*
确保在调用时，先调用到自定义的方法。有两种方式可以实现：
- 数组对象上直接有该方法，这样就不会去找对象上的原型链
- 覆盖对象的 __proto__ ，这样寻找原型链时，就会先找到我们的方法
*/
// 如果能使用 __proto__ 则将数组的处理方法进行替换
function protoAugment(target, src) {
    target.__proto__ = src
}
// 如果不能使用 __proto__ 则直接将该方法定义在当前对象下
function copyAugment(target, src, keys) {
    for (let i = 0; i < keys.length; i++) {
        def(target, keys[i], src[keys[i]])
    }
}

...

constructor(value) {
	this.value = value
	this.dep = new Dep() // 支持 Observer 实例调用 dep 的方法
	def(value, '__ob__', this)
	// 和对象处理不同的是，数组长度不能确定，一开始定义索引的 get/set 没有意义，所以这里并没有对索引使用 defineReactive
	if (Array.isArray(value)) {
		// 兼容某些浏览器不支持 Object.prototype.__proto__ 的情况
		const augment = ('__proto__' in {}) ? protoAugment : copyAugment
		// 改变数组原生方法，使得调用改变数据的方法时（例如 arr.push）得以响应数据
		augment(value, arrayMethods, Object.keys(arrayMethods))
		this.observeArray(value)
	} else {
		this.walk(value)
	}
}
```
详细测试代码见 index.js
