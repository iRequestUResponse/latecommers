import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: null
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('./views/Management.vue')
    },
  ]
})
