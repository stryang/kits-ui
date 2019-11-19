import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import ElementUI from 'element-ui'
import cookie from 'js-cookie'
import './assets/iconfont/iconfont.css'
import 'font-awesome/css/font-awesome.css'
import './static/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$cookie = cookie
Vue.use(ElementUI)

//  获取角色信息，根据用户权限动态加载路由
router.beforeEach((to, from, next) => {
    if (to.path === '/' || to.path === 'login') {
        next()
    } else {
        if (!store.getters.token) {
            next({path: '/login'})
        } else {
            !async function getAddRouters() {
                await store.dispatch('setIsInit', true)
                await store.dispatch('newRoutes', store.getters.info.role)
                await router.addRoutes(store.getters.addRouters)
                next({path: '/index'})
            }()
            let is404 = to.matched.some(record => {
                if (record.meta.role) {
                    return record.meta.role.indexOf(store.getters.info.role) === -1
                }
            })
            if (is404) {
                next({path: '/404'})
                return false
            }
            next()
        }
    }
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
