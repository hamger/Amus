import observer from './observer'
import Compiler from './compiler'

class Amus {
	constructor (options) {
		this.data = options.data
		// 监听数据
		observer(this.data,this)

		// 编译节点,更新view
		new Compiler(options.el || document.body,this)
	}
}

window.Amus = Amus

export default Amus
