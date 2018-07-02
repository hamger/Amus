import {empty} from './util'

export function mergeOptions(parent, child) {
    // 直接合并 parent 和 child ，避免
    // 除 data/methods/watch/computed 之外的属性丢失
    let options = Object.assign({}, parent, child)

    // 合并 data ，一个函数
    options.data = mergeData(parent.data, child.data)

    // 合并 methods 同名覆盖
    options.methods = Object.assign(parent.methods || {}, child.methods || {})

    // 合并 watcher 同名合并成一个数组
    options.watch = mergeWatch(parent.watch, child.watch)

    // 合并 computed 同名覆盖
    options.computed = Object.assign(parent.computed || {}, child.computed || {})

    return options
}

function mergeData(parentValue, childValue) {
    if (!parentValue) return childValue || empty
    if (!childValue) return parentValue
    
    return function () {
        // parentValue / childValue 是函数
        return Object.assign(parentValue.call(this), childValue.call(this))
    }
}

function mergeWatch(parentVal, childVal) {
    if (!childVal) return parentVal || {}
    let ret = Object.assign({}, parentVal)
    for (let key in childVal) {
        let parent = ret[key]
        let child = childVal[key]
        if (parent && !Array.isArray(parent)) {
            parent = [parent]
        }
        ret[key] = parent
            ? parent.concat(child)
            : Array.isArray(child) ? child : [child]
    }
    return ret
}