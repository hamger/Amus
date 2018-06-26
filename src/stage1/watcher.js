
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
        const value = this.data[this.expression]
        const oldValue = this.value
        this.value = value
        this.callback.call(this.obj, value, oldValue)
    }
}
