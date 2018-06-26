
import { pushTarget, popTarget } from './dep'

export default class Watcher { 
    constructor(data, expression, callback) {
        this.data = data
        this.expression = expression
        this.callback = callback
        this.get()
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
