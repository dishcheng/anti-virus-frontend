import Vue from 'vue'
import axios from 'axios'
import { LocalStorage, SessionStorage } from 'quasar'
import { Notify } from 'quasar'
import requestInfo from 'boot/requestHost'

console.log(requestInfo)
// 我们创建我们自己的axios实例并设置一个自定义的基本URL。
// 请注意，如果我们不在这里设置任何配置，我们不需要
// 一个命名的导出，因为我们可以`import axios from 'axios'`
// let host = process.env.DEV ? 'http://anti.test/api/' : 'http://anti-backend-test.tinali.cn/api/'
const axiosInstance = axios.create({
  baseURL: requestInfo.host,
})

axiosInstance.interceptors.request.use(
  config => {
    let shop_token = LocalStorage.getItem('shop_token')
    console.log('shop_token:' + shop_token)
    // do something before request is sent
    if (shop_token) {
      config.headers.Authorization = shop_token
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['Bearer '] = getToken()
      // config.headers['Authorization'] = shop_token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
axiosInstance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.status_code !== 200) {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: res.message,
        icon: 'report_problem'
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('你已经登出，你可以点击取消保持在当前页面，或者重新登录', '验证过期', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('axiosError' + error) // for debug
    if (error.response.status === 401) {
      LocalStorage.remove('shop_token')
      Notify.create({
        color: 'negative',
        position: 'top',
        message: '请重新登录',
        icon: 'report_problem'
      })
    }
    return Promise.reject(error)
  }
)

Vue.prototype.$axios = axiosInstance
export default { axiosInstance }
