import request from '@/api/axios'
import store from '@/store'
import router from '@/router'
import axios from 'axios'
import {Message} from "element-ui"
import Cookies from 'js-cookie'

export function httpRequest(url, data, method) {
    return request({
        url: url,
        method: method,
        params: data
    })
}

export function httpPost(url, data) {
    return request.post(url, data)
}

export function httpGet(url, data) {
    return request.get(url, data)
}

export function login(data) {
    return axios({
        url: '/oauth/token',
        headers: {
            Authorization: 'Basic a2l0czpraXRz'
        },
        method: 'post',
        params: data
    }).then(res => {
        Message({
            message: '登录成功！',
            type: 'success'
        });
        store.dispatch('setToken', res.data.access_token)
        Cookies.set('userInfo', {userName: data.username} ,{ expires: 1/24 });
        router.replace({path: '/index'})
    })
}


export const logout = () => {
    // request({
    //     url: '/logout',
    //     method: 'delete'
    // }).then(res => {
    //     store.dispatch('setToken', '')
    //     router.push({path: '/'})
    // })

    router.push({path: '/'})
}
