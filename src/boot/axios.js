import Vue from 'vue'
import axios from 'axios'
import { LocalStorage, SessionStorage } from 'quasar'

let shop_token = LocalStorage.getItem('shop_token')

console.log('shop_token:', shop_token)
// 我们创建我们自己的axios实例并设置一个自定义的基本URL。
// 请注意，如果我们不在这里设置任何配置，我们不需要
// 一个命名的导出，因为我们可以`import axios from 'axios'`
let host = process.env.DEV ? 'http://anti.test/api/' : 'http://anti-backend-test.tinali.cn/api/'

const axiosInstance = axios.create({
  baseURL: host,
})

axiosInstance.interceptors.request.use(
  config => {
    // do something before request is sent
    if (shop_token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['Bearer '] = getToken()
      config.headers['Authorization'] = shop_token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = axiosInstance
export default { axiosInstance }
