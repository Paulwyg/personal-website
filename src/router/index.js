import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path:'/main',
    name:'main',
    component:()=>import('../components/Main.vue')
  },
  {
    path:'/articles',
    name:'articles',
    component:()=>import('../views/Articles.vue')
  },
  {
    path:'/essay',
    name:'essay',
    component:()=>import('../views/Essay.vue'),
  },
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export function createRouter(){
  return router
}
