
/**
 *
 * http配置
 *
 */

import axios from 'axios'
import store from '@/store'
import api from '@/api'
import router from '@/router'
import { Message, Notification } from 'element-ui'
// 超时时间
// axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
// HTTPrequest拦截
axios.interceptors.request.use(config => {
  if (store.getters.token && typeof(config.headers['Authorization']) == "undefined" ) {
    config.headers['Authorization'] = 'Bearer ' + store.getters.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  // config.headers['isToken'] = false
  // config.headers['TENANT_ID'] = '1'
  // config.headers['Authorization'] = 'Basic c2M6c2M='
  return config
}, error => {
  return Promise.reject(error)
})
// HTTPresponse拦截
axios.interceptors.response.use(data => {
  return data
}, error => {
  const errMsg = error.toString()
  const code = errMsg.substr(errMsg.indexOf('code') + 5)
  Message({
    message: '异常',
    type: 'error',
    offset: 100
  })
  if (parseInt(code) === 428) {
    return Promise.reject(new Error('428'))
  }
    // Notification.error({
    //     title: '系统提示',
    //     message: errorCode[code] || errorCode['default'],
    //     offset: 100
    // });

  if (parseInt(code) === 401) {
    api.logout()
  }

  return Promise.reject(new Error(error))
})

export default axios
