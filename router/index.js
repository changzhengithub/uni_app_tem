/**
 * @desc 路由表
 * 默认uin_app没有路由，借助uni-read-pages读取page.json的所有页面配置和uni-simple-router模拟路由
 * ROUTES为vue.config.js配置全局路由变量即路由表
 * */ 

import Vue from 'vue'
import Router from '@/components/uni-simple-router'

Vue.use(Router)
//初始化  
const router = new Router({
  APP: {
    animation: {
      animationType: 'pop-in',
      animationDuration: 300
    }
  },
  routes: ROUTES //路由表  
})

//全局路由前置守卫
router.beforeEach((to, from, next) => { next() })
// 全局路由后置守卫  
router.afterEach((to, from) => { })

export default router