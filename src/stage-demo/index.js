import RD from './model/index'
import dom from './dom/index'
import App from './component/App'
import './index.scss'

// 为rd添加操作dom的插件（在rd的原型上添加一些方法）
RD.use(dom, RD)

// 挂载dom元素
RD.$mount(document.getElementById('app'), App)