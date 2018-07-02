import {isDOM} from './source/util/util'

export default {
  install(RD) {

    RD.$mount = function (el, rd) {
        if (isDOM(el)) el.innerHTML = rd
        else document.querySelector(el).innerHTML = rd
    }

    RD.prototype.$log = function (...arg) {
      console.log(arg)
    }

  }
}