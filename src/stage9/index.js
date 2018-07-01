import {Amus} from './Amus'

// 使用基础 Amus 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
let childConstructor = Amus.extend({
    data() {
        return {
            dataTest: 1
        }
    },
    methods: {
        methodTest() {
            console.log('methodTest')
        }
    },
    watch: {
        'dataTest'(newValue, oldValue) {
            console.log('watchTest newValue = ' + newValue)
        }
    },
    computed: {
        'computedTest': {
            get() {
                return this.dataTest + 1
            }
        }
    }
})

// 实例化一个子组件
let child = new childConstructor({
    data() {
        return {
            subData: 11
        }
    },
    methods: {
        subMethod() {
            console.log('subMethodTest')
        }
    },
    watch: {
        'subData'(newValue, oldValue) {
            console.log('subWatch newValue = ' + newValue)
        }
    },
    computed: {
        'subComputed': {
            get() {
                return this.subData + 1
            }
        }
    }
})

console.log(child.dataTest)
// 1
console.log(child.subData)
// 11

console.log(child.computedTest)
// 2
console.log(child.subComputed)
// 12

child.methodTest()
// methodTest
child.subMethod()
// subMethodTest

child.dataTest = 2
// watchTest newValue = 2
child.subData = 12
// subWatch newValue = 12

console.log(child.constructor === childConstructor)
// true
console.log(childConstructor.super === Amus)
// true
