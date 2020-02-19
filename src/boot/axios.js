import Vue from 'vue'
import axios from 'axios'

// 我们创建我们自己的axios实例并设置一个自定义的基本URL。
// 请注意，如果我们不在这里设置任何配置，我们不需要
// 一个命名的导出，因为我们可以`import axios from 'axios'`
let host = process.env.DEV ? 'http://anti.test/api/' : 'http://anti-backend-test.tinali.cn/api/'
const axiosInstance = axios.create({
  baseURL: host
})
Vue.prototype.$axios = axiosInstance
export default { axiosInstance }
