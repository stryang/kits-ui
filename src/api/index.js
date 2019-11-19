import * as httpApi from './httpApi'

export default {
  /**
   * 请求示例 = > post 请求
  login: data => {
    return axios.post('/login', qs.stringify(data))
  }
   * 请求示例 = > get 请求
  login: data => {
    return axios.get('/login', {params:data})
  }
  */
  ...httpApi
}
/**
 * 该文件会在main.js中以$api为键添加到vue的原型中，在组件中调用该文件里面的方法请使用
 * this.$api.login(params).then(res=>{ //成功的回调 }).catch(err=>{ //失败的回调 })
 */
