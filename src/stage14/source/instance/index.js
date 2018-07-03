import {
  Event
} from '../observer/event'
import observe from '../observer/observer'
import Watcher from '../observer/watcher'
import Computed from '../observer/computed'
import {
  proxy,
  getProvideForInject
} from '../util/util'
import {
  mergeOptions
} from '../util/options'

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

    // 获取父节点
    let parent = vm.$options.parent
    // 将该节点放到父节点的 $children 列表中
    if (parent) parent.$children.push(vm)
    // 设置父节点和根节点
    vm.$parent = parent
    vm.$root = parent ? parent.$root : vm
    // 初始化子节点列表
    vm.$children = []

    // 代理 methods 属性中方法
    for (let key in vm.$options.methods) {
      vm[key] = vm.$options.methods[key].bind(vm)
    }

    // 观察并代理 data 属性中数据
    let data = vm._data = vm.$options.data ? vm.$options.data.call(vm) : {}
    observe(data)
    for (let key in vm._data) {
      proxy(vm, '_data', key)
    }

    // 观察并代理 props 属性中数据
    let props = vm._props = {}
    let propsData = vm.$options.propsData
    for (let key in vm.$options.props) {
      let value = propsData[key]
      if (!value) {
        value = vm.$options.props[key].default
      }
      props[key] = value
    }
    observe(props)
    for (let key in props) {
      proxy(vm, '_props', key)
    }

    // 处理 watcher 属性内容
    for (let key in vm.$options.watch) {
      new Watcher(vm, () => {
        return key.split('.').reduce((obj, name) => obj[name], vm)
      }, (newValue, oldValue) => {
        vm.$options.watch[key].forEach(fnc => fnc(newValue, oldValue))
      })
    }

    // 处理 computed 属性内容
    for (let key in vm.$options.computed) {
      new Computed(vm, key, vm.$options.computed[key])
    }

    // 处理 provide / inject 属性内容
    vm._provide = vm.$options.provide
    let inject = vm._inject = {}
    for (let key in vm.$options.inject) {
      inject[key] = getProvideForInject(vm, key, vm.$options.inject[key].default)
    }
    for (let key in inject) {
      proxy(vm, '_inject', key)
    }
  }
}
