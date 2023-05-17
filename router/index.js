/**
 * @desc 路由表
 * 默认uin_app没有路由，借助uni-read-pages读取page.json的所有页面配置和uni-simple-router模拟路由
 * ROUTES为vue.config.js配置全局路由变量即路由表
 * */
 import store from '@/store'
import { RouterMount, createRouter } from 'uni-simple-router'

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [
    ...ROUTES,
    {
      path: '*',
      redirect: (to) => {
        return {
          name: '404'
        };
      }
    }
  ]
})

const whiteList = ['/pages/empower/index']
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  // next()
  // 权限判断
  if (uni.getStorageSync('token')) {
    if (whiteList.includes(to.name)) {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断是否认证成功
      if (!store.state.empower.userInfo) {
        store.dispatch('GetUserInfo')
          .then(() => {
            next()
          })
          .catch((err) => {
            uni.showToast({
              title: err.message,
              icon: 'none',
              duration: 1500
            })
            next()
          })
      } else {
        next()
      }
    }
  } else {
    // 在免登录白名单，直接进入
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/pages/empower/index'})
    }
  }
})

export {
  router,
  RouterMount
}