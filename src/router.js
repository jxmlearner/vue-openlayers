import Vue from 'vue'
import Router from 'vue-router'
import MainMap from './views/MainMap.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'map',
      component: MainMap
    }
  ]
})
