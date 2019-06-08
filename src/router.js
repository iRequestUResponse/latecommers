import Vue from 'vue'
import Router from 'vue-router'
import Example from './views/Example.vue'

import Login from './views/Login'

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
      path: '/example',
      name: 'example',
      component: Example
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
