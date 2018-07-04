import {
  Event
} from '../observer/event.ts'
import {
  mergeOptions
} from '../util/options'
import {initProps} from './props'
import {initState} from './state'

let uid = 0

export class Amus extends Event {
  constructor (options) {
    super()
    this.uid = uid++
    this._init(options)

    // 递归实例化子组件
    function createSub (parent) {
      if (Object.keys(parent.$options).indexOf('components') > -1) {
        let components = parent.$options.components
        for (let key in components) {
          let SubClass = Amus.extend(components[key])
          let sub = new SubClass({
            parent: parent
          })
          createSub(sub)
        }
      }
    }

    createSub(this)
  }

  _init (options) {
    let vm = this

    // 合并配置项
    vm.$options = mergeOptions(
      this.constructor.options,
      options,
      vm
    )

    initProps(vm)

    initState(vm)
  }
}
