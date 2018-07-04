import { Event } from "./event";

let eventTest = new Event()

function test (funcName, param) {
    console.log('函数名：' + funcName + '; ' + '参数：' + param)
}

eventTest.$on('eventName1', (e) => {
    test('fn1', e)
})

eventTest.$on('eventName2', [(e) => {
    test('fn2', e)
}, (e) => {
    test('fn3', e)
}])

eventTest.$on(['eventName3', 'eventName4'], (e) => {
    test('fn4', e)
})

eventTest.$on(['eventName5', 'eventName6'], [(e) => {
    test('fn5', e)
}, (e) => {
    test('fn6', e)
}])

eventTest.$emit('eventName1', '参数1')

eventTest.$emit('eventName2', '参数2')

eventTest.$emit('eventName3', '参数3')

eventTest.$emit('eventName4', '参数4')

eventTest.$emit('eventName5', '参数5')

eventTest.$emit('eventName6', '参数6')

console.log('------------------------------')

eventTest.$off('eventName1')
eventTest.$off(['eventName2', 'eventName3'])

eventTest.$emit('eventName1', '参数1')
// 无输出
eventTest.$emit('eventName2', '参数2')
// 无输出
eventTest.$emit('eventName3', '参数3')
// 无输出

eventTest.$emit('eventName4', '参数4')

eventTest.$emit('eventName5', '参数5')

eventTest.$emit('eventName6', '参数6')

console.log('------------------------------')

eventTest.$off()
eventTest.$emit('eventName1', '参数1')
// 无输出
eventTest.$emit('eventName2', '参数2')
// 无输出
eventTest.$emit('eventName3', '参数3')
// 无输出
eventTest.$emit('eventName4', '参数4')
// 无输出
eventTest.$emit('eventName5', '参数5')
// 无输出
eventTest.$emit('eventName6', '参数6')
// 无输出
console.log('------------------------------')

let fn7 = (e) => {
    console.log(e)
}
let fn8= (e) => {
    console.log(e)
}
eventTest.$on('eventName7', [fn7, fn8])
eventTest.$on('eventName7', (e) => {
    console.log(e)
})
eventTest.$off('eventName7', [fn7, fn8])
eventTest.$emit('eventName7', '测试取消')

console.log('------------------------------')
eventTest.$once('testOnce', function (event) {
    console.log('事件仅仅触发一次，参数：' + event)
})
eventTest.$emit('testOnce', '事件触发成功')
// 事件仅仅触发一次，参数：事件触发成功
eventTest.$emit('testOnce', '事件取消，不会有输出')
// 无输出