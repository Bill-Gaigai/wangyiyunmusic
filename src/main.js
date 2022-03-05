import Vue from 'vue'
import App from './App.vue'
import router from './router' //导入的路由对象
import store from './store'
import '@/mobile/flexible' //引入移动端适配的文件
import '@/styles/reset.css' //引入初始化样式文件







// 使用vant制作tabbar
import { Tabbar, TabbarItem, NavBar, Row, Col, Image as VanImage, Cell, CellGroup, Icon, Search, List } from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Row).use(Col).use(VanImage).use(Cell).use(CellGroup).use(Icon).use(Search).use(List);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')