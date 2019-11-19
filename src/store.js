import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import routerData from './vuex/modules/routerData'
import role from './vuex/modules/role'
import layout from './vuex/modules/layout/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: Cookies.get('token'),
        isInit: false
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            Cookies.set('token', token ,{ expires: 1/24 });
        },
        setIsInit (state, isInit) {
            state.isInit = isInit
        }
    },
    actions: {
        setToken ({commit}, token) {
            return new Promise((resolve, reject) => {
                commit('setToken', token)
                resolve()
            })
        },
        setIsInit ({commit}, isInit) {
            return new Promise((resolve, reject) => {
                commit('setIsInit', isInit)
                resolve()
            })
        }
    },
    getters: {
        addRouters: state => state.routerData.addRouters,
        token: state => state.token,
        info: state => state.role.info,
        routers: state => state.routerData.routers,
        logoShow: state => state.layout.logoShow,
        isCollapse: state => state.layout.isCollapse,
        uniquerouter: state => state.layout.uniquerouter,
        tabnavBox: state => state.layout.tabnavBox,
        visible: state => state.layout.visible,
        left: state => state.layout.left,
        top: state => state.layout.top,
        rightNav: state => state.layout.rightNav,
        isInit: state => state.isInit
    },
    modules: {
        routerData,
        role,
        layout
    },
})

export default store
