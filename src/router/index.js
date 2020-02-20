import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import axios from '../boot/axios'
import { LocalStorage, SessionStorage } from 'quasar'

Vue.use(VueRouter)
Vue.use(axios)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  const whiteList = ['/admin/login', '/', '/order_detail','/shopJoinIn'] // no redirect whitelist
  Router.beforeEach(async (to, from, next) => {
    // console.log(to.path, from.path)
    // determine whether the user has logged in
    const hasToken = LocalStorage.getItem('shop_token')
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      if (!hasToken) {
        next('/admin/login')
      } else {
        next()
      }
    }
  })

  return Router
}
