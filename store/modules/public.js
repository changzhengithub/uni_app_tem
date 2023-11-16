/**
 * @desc 状态管理器 - 公共数据
 * @author
*/

import { getSystemInfoApi, getUnitConfigApi } from '@/api/public'

const publicVuex = {
  state: {
    systemInfo: {}, // 系统信息
    permConfig: null // 单位配置详情
  },

  mutations: {
    setSystemInfo(state, systemInfo) {
      state.systemInfo = systemInfo
    },
    setPermConfig(state, permConfig) {
      state.permConfig = permConfig
    }
  },
  getters: {},
  actions: {
    // 获取单位配置详情
    GetUnitConfig({ commit }) {
      return new Promise((resolve, reject) => {
        getUnitConfigApi().then(res => {
          const data = res.data
          commit('setPermConfig', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default publicVuex