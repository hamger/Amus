import Watcher from './watcher'

// 创建一个管理依赖的类
export default class Dep {
    static target: Watcher;
    subs: Array<Watcher>;

    constructor () {
        // 依赖的集合，依赖是 Watcher 的实例
        this.subs = [] 
    }

    // 添加依赖，在属性的 getter 中使用（见 ./observer.js）
    addSub(sub: Watcher) {
        this.subs.push(sub)
    }

    // 发布公告，在属性的 setter 中使用（见 ./observer.js）
    notify() {
        this.subs.forEach(sub => {
            // 依赖自我更新（见 ./watcher.js）
            sub.update() 
        })
    }
}

// 添加一个 watcher 实例
export function pushTarget (_target: Watcher) {
  Dep.target = _target
}

// 删除一个 watcher 实例
export function popTarget () {
  Dep.target = null
}
