## amus-stage1
实现一个基础的数据响应监听
```js
var data = {
	num1: 20
}
observe(data)
new Watcher(data, 'num1', function () {
	console.log('触发修改num1的回调')
})
dada.num1++ // 期望触发回调 
```

### observe
通过 Obeject.defineProperty() 定义属性的 set 和 get ，在 get 中进行依赖收集，在 set 中触发依赖 
```js
import Dep from './dep'

function defineReactive(object, key, value) {
    let dep = new Dep()
    Object.defineProperty(object, key, {
        configurable: true,
        enumerable: true,
        get: function () {
            if (Dep.target) dep.addSub(Dep.target)
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
    else ob = new Observer(value)
    return ob
}
```

### Dep
引入一个 Dep 对象，作为依赖管理器。data 下的每一个属性都有一个唯一的 Dep 对象，在 get 中收集仅针对该属性的依赖，然后在 set 方法中触发所有收集的依赖。Dep.target 用来暂存某一个依赖。
```js
export default class Dep {
    // 静态属性
	static target 

    constructor () {
        // 依赖的集合，依赖是 Watcher 的实例
        this.subs = [] 
    }

    // 添加依赖
    addSub(sub) {
        this.subs.push(sub)
    }

    // 发布公告
    notify() {
        this.subs.forEach(sub => {
            // 依赖自我更新
            sub.update() 
        })
    }
}

Dep.target = null
// 添加一个 watcher 实例
export function pushTarget (_target) {
  Dep.target = _target
}

// 删除一个 watcher 实例
export function popTarget () {
  Dep.target = null
}
```

### Watcher
有了依赖管理器的类，我们还需要建立一个依赖的类：Watcher
```js
import { pushTarget, popTarget } from './dep'

export default class Watcher { 
    constructor(data, expression, callback) {
        this.data = data
        this.expression = expression
        this.callback = callback
        this.value = this.get()
    }

    get() {
        pushTarget(this)
        // 此时会触发对应属性的get
        const value = this.data[this.expression]
        popTarget()
        return value
    }
    
    update() {
        this.callback()
    }
}
```
至此我们已经实现了开头的数据监听，总结收集依赖和触发依赖的流程如下

1. 实例化 Watcher
2. 触发属性的get
3. 收集依赖

1. 外部修改属性值
2. 触发属性的set
3. 触发依赖