import {Amus} from './Amus'

const options = {
    provide: {
        foo: 'fooVal'
    },
    components: {
        sub: {
            inject: {
                foo: {default: 'foo'},
                bar: {default: 'subBar'}
            },
            components: {
                subSub: {
                    inject: {
                        foo: {default: 'foo'},
                        bar: {default: 'subSubBar'}
                    }
                }
            }
        }
    }
}

// 父组件
let test = new Amus(options)

let testSubClass = Amus.extend(test.$options.components.sub)
// 子组件
let testSub = new testSubClass({parent: test})

let testSubSubClass = Amus.extend(testSub.$options.components.subSub)
// 孙组件
let testSubSub = new testSubSubClass({parent: testSub})

console.log(testSub.foo)
// fooVal
console.log(testSub.bar)
// subBar
console.log(testSubSub.foo)
// fooVal
console.log(testSubSub.bar)
// subSubBar
