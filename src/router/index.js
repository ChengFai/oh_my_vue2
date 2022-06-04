import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import chart from '../components/chart2.vue'

Vue.use(VueRouter)
Vue.use(Element)

const routes = [
  {
    path: '/chart',
    name: 'chart',
    component: chart
  },
  {
    path: '/binance',
    name: 'binance',
    component: () => import ('../components/binance.vue' )
  },
  {
    path: '/havekeep',
    name: 'havekeep',
    meta: {
      keepAlive: true // 需要被缓存
    },
    component: () => import ('../components/havekeep.vue' )
  }, //测试一下keep-alive效果
  {
    path: '/nokeep',
    name: 'nokeep',
    meta: {
      keepAlive: false 
    },
    component: () => import ('../components/nokeep.vue' )
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})
export default router
