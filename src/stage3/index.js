import observe from './observer'
import Watcher from './watcher'

var data = {
	num1: 20,
	num2: 22,
}
observe(data)
var aaa = new Watcher(data, 'num1', function (newVal, oldVal) {
	console.log('num1新值：' + newVal + '; 旧值：' + oldVal)
})
var bbb = new Watcher(data, 'num2', function (newVal, oldVal) {
	console.log('num2新值：' + newVal + '; 旧值：' + oldVal)
})
data.num1++
data.num2++

aaa.dep.removeSub(aaa)
data.num1++
data.num2++
