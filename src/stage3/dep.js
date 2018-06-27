export default class Dep {
    constructor() {
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

Dep.target = null
export function pushTarget(_target) {
    Dep.target = _target
}

export function popTarget() {
    Dep.target = null
}

/**
 * Remove an item from an array
 */
export function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) return arr.splice(index, 1)
    }
}