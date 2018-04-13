import axios from 'axios'
// export default axios.create({
//   baseURL: 'http://localhost:8888/api/private/v1/'
// })
import {getToken} from './auth'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 拦截器
http.interceptors.request.use(function (config) {
  // console.log(getToken())
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

const httpPlugin = {}

httpPlugin.install = function (Vue, options) {
  // 4. 添加实例方法
  Vue.prototype.$http = http
}

export default httpPlugin

// Vue.use(httpPlugin)
