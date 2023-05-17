/**
 * @desc 状态管理器 - 权限控制
 * @author changz
*/

import { loginApi, userInfoApi } from '@/api/empower'

const empower = {
  state: {
    routerList: [], // 路由列表
    userInfo: null // 用户信息
  },
  mutations: {
    // 过滤后的路由列表
    setRouterList(state, routerList) {
      state.routerList = routerList
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo).then(res => {
          const { token, user } = res.data
          uni.setStorageSync('token', token)
          commit('setUserInfo', user)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        userInfoApi().then(res => {
          const data = res.data
          commit('setUserInfo', data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default empower