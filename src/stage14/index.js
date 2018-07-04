import Amus from './source'
import plugin from './plugin'

const options = {
  el: 'app',
  data () {
    return {
      text: 'data'
    }
  }
}

let test = new Amus(options)

Amus.use(plugin, Amus)

window.onload = function () {
  Amus.$mount(document.getElementById(test.$options.el), '<div>haha</div>')
  test.$log('Amus.use is successful!')
}
