import {remove} from '../util/util'

let uid = 0

export default class Dep {
  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  removeSub (sub) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

Dep.target = null
export function pushTarget (_target) {
  Dep.target = _target
}

export function popTarget () {
  Dep.target = null
}
