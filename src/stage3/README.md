## amus-stage2
有添加监听就有取消监听，我们期望通过如下调用可以取消监听
```

```



所以在 Dep 中加入 removeSub 方法，用于删除依赖
```
removeSub (sub){
    const index = this.subs.indexOf(sub)
    if (index > -1) {
        this.subs.splice(index, 1)
    }
}
```
现在的问题是如何在 Watcher 实例上调用该方法，就是如何 将 Watcher 实例和 Dep 实例关联起来，最终得到如下解决方法
```

```