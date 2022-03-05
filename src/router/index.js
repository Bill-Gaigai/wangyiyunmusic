import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入一级路由
import Layout from '@/views/Layout'
import Play from '@/views/Play'


// 引入二级路由
import Home from '@/views/Home/index'
import Search from '@/views/Search'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout',
        component: Layout,
        redirect: '/layout/home',
        children: [{
                path: 'home',
                component: Home,
                meta: { // meta保存路由对象额外信息的
                    title: "网易云音乐"
                }
            },
            {
                path: 'search',
                component: Search,
                meta: {
                    title: "搜索"
                }
            }
        ]
    },
    {
        path: '/play',
        component: Play
    }
]


const router = new VueRouter({
    routes,
})

export default router