import observe from './observer'
import Watcher from './watcher'

var data = {
	num1: 20,
	num2: 22,
}
observe(data)
var aaa = new Watcher(data, function () {
	return this.num1 + this.num2
}, function (newVal, oldVal) {
	console.log('sum新值：' + newVal + '; 旧值：' + oldVal)
})
data.num1++
data.num2++

aaa.teardown()

data.num1++
data.num2++
