## amus-stage3
> 添加取消监听的功能

有添加监听的方法就要有取消监听的功能，我们期望通过如下调用可以取消监听
```js
var data = {
	num1: 20,
}
observe(data)
var aaa = new Watcher(data, 'num1', function (newVal, oldVal) {
	console.log('num1新值：' + newVal + '; 旧值：' + oldVal)
})
data.num1++  // num1新值：21; 旧值：20
aaa.dep.removeSub(aaa)
data.num1++  // 无返回  
```

### Dep
首先需要在 Dep 中加入 removeSub 方法，用于删除依赖；加入 depend 方法用于 watcher 实例调用 addDep 方法
```js
removeSub (sub){
    const index = this.subs.indexOf(sub)
    if (index > -1) {
        this.subs.splice(index, 1)
    }
}

depend() {
    if (Dep.target) Dep.target.addDep(this)
}
```

### Watcher
接下来在 Watcher 中定义 addDep 方法，并创建一个属性 dep 用来保存 dep 实例
```js
export default class Watcher { 
    constructor(vm, expOrFn, callback) {
        this.vm = vm
        this.callback = callback
        this.dep = null
        ...
    }
    ...
    addDep (dep) {
        this.dep = dep
    }
}
```

### observer
当然还需要在属性的get中调用 dep.depend 
```js
function defineReactive(object, key, value) {
    let dep = new Dep()
    observe(value)
    Object.defineProperty(object, key, {
        configurable: true,
        enumerable: true, 
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target)
                dep.depend() // 新增
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
```
