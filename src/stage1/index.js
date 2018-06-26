import observe from './observer'
import Watcher from './watcher'

var data = {
	num1: 20,
	num2: 22,
}
observe(data)
new Watcher(data, 'num1', function () {
	console.log('触发修改num1的回调')
})
new Watcher(data, 'num2', function () {
	console.log('触发修改num2的回调')
})
data.num1++
data.num2++
data.num1++
