import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login.vue'
import Home from '@/components/home/home'

import UserList from '@/components/user-list/user-list'

import RoleList from '@/components/role-list/role-list'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      // 在父路由中通过children来声明子路由
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'role-list',
          path: '/roles',
          component: RoleList
        }
      ]
    }
  ]
})

// 1.添加路由拦截器（导航钩子，导航守卫）
// to 我要去哪里
// from 我从哪里来
// next 用来放行
router.beforeEach((to, from, next) => {
  // 拿到当前请求的视图路径标识，如果是登录组件直接通过，否则检查token令牌
  // 有令牌的通过，无令牌去登陆
  if (to.name === 'login') {
    next()
  } else {
    // 检查登录状态令牌
    const token = window.localStorage.getItem('admin-token')
    if (!token) { // 无令牌去登陆
      next({
        name: 'login'
      })
    } else { // 有令牌允许通过
      next()
    }
  }
})

export default router
