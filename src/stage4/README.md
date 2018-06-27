## amus-stage4
> watcher 中收集多个 dep

实际需求中往往存在多个属性触发同一个渲染函数的情况（该渲染函数依赖多个属性），那么我们需要在一个 watcher 中保存多个 dep , 所以 watcher 中需要开辟一个数组来保存多个 dep ，同时需要一个函数来删除所有的 dep 。
```js
export default class Watcher { 
    constructor(vm, expOrFn, callback) {
        this.vm = vm
        this.callback = callback
        this.deps = [] // 变更为使用数组保存 dep
        ...
    }

    ...

    addDep (dep) {
        this.deps.push(dep)
    }

    // 取消所有 dep 对 watcher 的依赖
    teardown () {
        let i = this.deps.length
        while (i--) this.deps[i].removeSub(this)
        this.deps = []
    }
}
```
只需要修改 watcher.js，然后在 index.js 中进行测试
```js
var data = {
	num1: 20,
	num2: 22,
}
observe(data)
var aaa = new Watcher(data, function () {
	return this.num1 + this.num2
}, function (newVal, oldVal) {
	console.log('sum新值：' + newVal + '; 旧值：' + oldVal)
})
data.num1++ // sum新值：43; 旧值：42
data.num2++ // sum新值：44; 旧值：43

aaa.teardown()

data.num1++ // 无返回
data.num2++ // 无返回
```



