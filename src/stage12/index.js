import {Amus} from './Amus'

const options = {
    data () {
        return {
            text: 'data'
        }
    },
    components: {
        sub: {
            data () {
                return {
                    text: 'subData'
                }
            },
            components: {
                subSub: {
                    data () {
                        return {
                            text: 'subSubData'
                        }
                    }
                }
            }
        },
        sub2: {
            data () {
                return {
                    text: 'sub2Data'
                }
            },
        }
    }
}

let test = new Amus(options)

console.log(test.$children[0].text)
console.log(test.$children[1].text)
console.log(test.$children[0].$children[0].text)

