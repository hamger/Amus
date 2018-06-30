
import {Amus} from "./Amus";

let test = new Amus({
    data() {
        return {
            baseTest: 'baseTest',
            objTest: {
                stringA: 'stringA',
                stringB: 'stringB'
            }
        }
    },
    methods: {
        methodTest() {
            console.log('methodTest')
            this.$emit('eventTest', '事件测试')
        }
    },
    watch: {
        'baseTest'(newValue, oldValue) {
            console.log(`baseTest change ${oldValue} => ${newValue}`)
        },
        'objTest.stringA'(newValue, oldValue) {
            console.log(`objTest.stringA change ${oldValue} => ${newValue}`)
        }
    }
})

console.log(test.baseTest)
// baseTest

// 注册一个事件
test.$on('eventTest', function (event) {
    console.log(event)
})

test.methodTest()
// methodTest
// 事件测试

test.baseTest = 'baseTestChange'
// baseTest change baseTest => baseTestChange

test.objTest.stringA = 'stringAChange'
// objTest.stringA change stringA => stringAChange