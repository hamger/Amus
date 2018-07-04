import {remove} from '../util/util'
import Watcher from './watcher'

let uid = 0

export default class Dep {
  static target?: Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
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

export function pushTarget (_target: Watcher) {
  Dep.target = _target
}

export function popTarget () {
  Dep.target = null
}
