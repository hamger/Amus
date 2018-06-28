import { Event } from "./Event";

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
// 一次添加一个处理函数
// 参数1
eventTest.$emit('eventName2', '参数2')
// 一次添加多个处理函数，第一个
// 参数2
// 一次添加多个处理函数，第二个
// 参数2
eventTest.$emit('eventName3', '参数3')
// 多个事件添加同一处理函数
// 参数3
eventTest.$emit('eventName4', '参数4')
// 多个事件添加同一处理函数
// 参数4
eventTest.$emit('eventName5', '参数5')
// 多个事件添加多个处理函数，第一个
// 参数5
// 多个事件添加多个处理函数，第二个
// 参数5
eventTest.$emit('eventName6', '参数6')
// 多个事件添加多个处理函数，第一个
// 参数6
// 多个事件添加多个处理函数，第二个
// 参数6
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
// 多个事件添加同一处理函数
// 参数4
eventTest.$emit('eventName5', '参数5')
// 多个事件添加多个处理函数，第一个
// 参数5
// 多个事件添加多个处理函数，第二个
// 参数5
eventTest.$emit('eventName6', '参数6')
// 多个事件添加多个处理函数，第一个
// 参数6
// 多个事件添加多个处理函数，第二个
// 参数6
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