import Vue from 'vue'
import VueRouter from 'vue-router'

import page_one from '../views/page_one.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/one',
    name: 'one',
    component: page_one
  },
  {
    path: '/two',
    name: 'two',
    component: () => import ('../views/page_two.vue' )
  }
]

const router = new VueRouter({
  routes
})
export default router
