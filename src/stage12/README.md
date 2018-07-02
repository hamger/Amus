## amus-stage12
> 自动创建子组件

在阶段11中，我们需要手动的去创建组件，这显然过于繁琐，我们期望子组件可以根据传入的配置项而去自动创建子组件。
因此我们需要去改造 Amus 类的实例化过程。
```js
export class Amus extends Event {
    constructor(options) {
        super()
        this.uid = uid++
        this._init(options)

        // 递归 components 属性，并创建子组件
        function createSub (parent) {
            if (Object.keys(parent.$options).indexOf('components') > -1) {
                let components = parent.$options.components
                for (let key in components) {
                    let SubClass = Amus.extend(components[key])
                    let sub = new SubClass({parent: parent})
                    createSub(sub)
                }
            }
        }

        createSub(this)
    }
    ...
}
```