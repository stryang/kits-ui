import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/login.vue'
import index from './views/layout/index.vue'
import NotFound from './views/404/page404.vue'
import HomeMain from './views/page/index.vue'

Vue.use(Router)

let defaultRouter = [
  {
    path: '/',
    name: 'login',
    hidden: true,
    component: Login,
    children: []
  },{
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
    children: []
  },{
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  },
  {
    path: '/index',
    iconCls: 'el-icon-menu', // 图标样式class
    name: '主页',
    component: index,
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard', // 图标样式class
        name: '主页',
        component: HomeMain,
        children: []
      }
    ]
  },
]

let addRouter = [
  // {
  //   path: '/',
  //   iconCls: 'fa fa-user', // 图标样式class
  //   name: '人员管理',
  //   component: home,
  //   children: [
  //     {
  //       path: '/userList',
  //       iconCls: 'fa fa-user-plus', // 图标样式class
  //       name: '人员列表',
  //       component: UserList,
  //       children: []
  //     },
  //     {
  //       path: '/authManage',
  //       iconCls: 'fa fa-shield', // 图标样式class
  //       name: '权限管理',
  //       component: AuthManage,
  //       children: []
  //     }
  //   ]
  // }
]

export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
