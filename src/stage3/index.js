import observe from './observer'
import Watcher from './watcher'

var data = {
	num1: 20,
	num2: 22,
	num: {
		a: 12,
		b: 13
	}
}
observe(data)
new Watcher(data, 'num.a', function (newVal, oldVal) {
	console.log('num.a新值：' + newVal + '; 旧值：' + oldVal)
})
new Watcher(data, function () {
	return this.num.b
}, function (newVal, oldVal) {
	console.log('num.b新值：' + newVal + '; 旧值：' + oldVal)
})
data.num.a++
data.num.b++