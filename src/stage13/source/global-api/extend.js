import {mergeOptions} from '../util/options'

let cid = 0

export function initExtend(Amus) {
  Amus.cid = cid++
  /**
   * 返回一个子组件的类
   * @param {子组件配置项} extendOptions 
   */
  Amus.extend = function (extendOptions) {
    const Super = this

    class Sub extends Super {
      constructor(options) {
        super(options)
      }
    }

    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )

    Sub.super = Super
    Sub.extend = Super.extend
    Sub.cid = cid++

    return Sub
  }
}
