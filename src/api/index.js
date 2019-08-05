import axios from 'axios'
import store from '@/store'
import router from '../router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 这种只能获取一次,需要刷新
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser.token}`
// }

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 修改config,追加headers
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
  // 认为返回错误的promise对象
  return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response
}, (error) => {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
