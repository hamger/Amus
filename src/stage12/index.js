import {Amus} from './Amus'
import sub from './sub'
import sub2 from './sub2'

const options = {
    data () {
        return {
            text: 'data'
        }
    },
    components: {
        sub,
        sub2
    }
}

let test = new Amus(options)

console.log(test.$children[0].text)
console.log(test.$children[1].text)
console.log(test.$children[0].$children[0].text)

