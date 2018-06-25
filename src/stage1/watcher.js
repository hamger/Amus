import Dep from './dep'
import { timingSafeEqual } from 'crypto';

export default class Watcher { 
    constructor(vm, expression, callback) {
        // 静态属性，指向 Watcher 实例
        Dep.target = this 
        this.vm = vm
        this.expression = expression
        this.callback = callback
        this.update()
        Dep.target = null 
    }

    update() {
        this.callback()
    }
}
