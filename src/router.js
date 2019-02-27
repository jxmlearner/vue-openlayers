import Vue from 'vue'
import Router from 'vue-router'
import MainMap from './views/MainMap'
import AreaMap from './views/AreaMap'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'map',
      component: MainMap
    },
    {
      path:'/areamap',
      name: 'areamap',
      component: AreaMap
    },
    {
      path: '*',
      component: () => import('@/views/Error.vue') 
    }
  ]
})
