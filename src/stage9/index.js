import {Amus} from './Amus'

// 设置父组件 options
let parent = Amus.extend({
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

// 对父组件进行拓展，生成子组件
let child = new parent({
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

console.log(child.constructor === parent)
// true
console.log(parent.super === Amus)
// true
