// 创建一个管理依赖的类
export default class Dep {
    // 静态属性，用来存放依赖（见 ./watcher.js）
	static target 

    constructor () {
        // 依赖的集合，依赖是 Watcher 的实例
        this.subs = [] 
    }

    // 添加依赖，使用在属性的 getter 中（见 ./observer.js）
    addSub(sub) {
        this.subs.push(sub)
    }

    // 发布公告，使用在属性的 setter 中（见 ./observer.js）
    notify() {
        this.subs.forEach(sub => {
            // 依赖自我更新（见 ./watcher.js）
            sub.update() 
        })
    }
}
