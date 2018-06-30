/**
 * 为 obj.key 赋值并添加属性描述
 */
export function def(obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        value: value,
        writeable: true,
        configurable: true,
        enumerable: !!enumerable
    })
}

/**
 * 转换为字符串
 */
export function _toString(val) {
    // JSON.stringify(val, null, 2) 将对象美观的打印出来，换行，缩进为2个空格
    return val == null ?
        '' :
        typeof val === 'object' ?
        JSON.stringify(val, null, 2) :
        String(val)
}

/**
 * 转换为数字
 */
export function toNumber(val) {
    const n = parseFloat(val, 10)
    return (n || n === 0) ? n : val
}

/**
 * 将某项从数组中移除
 */
export function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

/**
 * 检验对象本身是否有该属性
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}

/**
 * 检验是否为原始类型（字符串或者数字）
 */
export function isPrimitive(value) {
    return typeof value === 'string' || typeof value === 'number'
}

/**
 * 转为一个类数组对象为一个数组
 */
export function toArray(list, start) {
    start = start || 0
    let i = list.length - start
    const ret = new Array(i)
    while (i--) {
        ret[i] = list[i + start]
    }
    return ret
}

/**
 * 将一个对象(_form)混合到另一个对象(to)
 */
export function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key]
    }
    return to
}

/**
 * 检验是否是对象
 */
export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

/**
 * 严格检验是否是对象
 */
const toString = Object.prototype.toString
export function isPlainObject(obj) {
    return toString.call(obj) === '[object Object]'
}

/**
 * 将数组转化为对象
 */
export function toObject(arr) {
    const res = {}
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i])
        }
    }
    return res
}

/**
 * 空函数
 */
export function noop() {}

/**
 * 返回 false 的函数
 */
export const no = () => false

/**
 * 宽送地比较两个值是否相等，对象类型通过 JSON.stringify 转换再进行比较
 */
export function looseEqual(a, b) {
    /* eslint-disable eqeqeq */
    return a == b || (
        isObject(a) && isObject(b) ?
        JSON.stringify(a) === JSON.stringify(b) :
        false
    )
    /* eslint-enable eqeqeq */
}

/**
 * 宽送地定位某个值的在数组中的位置
 */
export function looseIndexOf(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val)) return i
    }
    return -1
}

/**
 * 递归地合并对象
 */
export function mergeData(to, from) {
    let key, toVal, fromVal
    for (key in from) {
        toVal = to[key]
        fromVal = from[key]
        if (!hasOwn(to, key)) {
            def(to, key, fromVal)
        } else if (isObject(toVal) && isObject(fromVal)) {
            mergeData(toVal, fromVal)
        }
    }
    return to
}

/**
 * warn of Amus
 */
export function warn (msg) {
    console.error(`[Amus warn]: ${msg}`)
}
