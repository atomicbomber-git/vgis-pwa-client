import Vue from 'vue'
import VueRouter from 'vue-router'
import SplashScreen from '../SplashScreen'
import Home from '../Home'

Vue.use(VueRouter)

export const routeMap = {
  home: { path: '/home', component: Home },
  splash: { path: '/splash', component: SplashScreen }
}

const routes = [
  {
    path: '/',
    redirect: routeMap.splash.path
  }
]

for (const routeName in routeMap) {
  routes.push({
    ...routeMap[routeName],
    name: routeName
  })
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === routeMap.splash.path) {
    next(false)
    return
  }
  
  next()
})

export default router
