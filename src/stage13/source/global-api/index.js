import {initExtend} from './extend'
import {initUse} from './use'

export function initGlobalApi(Amus) {

  // 设置初始 options
  Amus.options = {
    components: {},
    _base: Amus
  }

  // 子类生成方法
  initExtend(Amus)

  // 扩展
  initUse(Amus)

}