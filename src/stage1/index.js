import observer from './observer'
import Watcher from './watcher'

var data = {
	num: 21,
	subNum1: 20,
	subNum2: 22
}

observer(data)
var watcher = new Watcher(data, 'subNum1', function () {
	console.log('触发修改subNum1的回调')
})

data.subNum2++
