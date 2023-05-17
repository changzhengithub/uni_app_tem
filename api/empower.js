import request from '@/utils/request'

const api = {
  login: '/api/common/login', // 登录
  userInfo: '/api/unit/user/userInfo' // 获取用户信息
}

// 登录
export function loginApi(parameter, loadText) {
  return request({
    url: api.login,
    method: 'POST',
    params: parameter,
    auth: true,
    loadText
  })
}

// 获取用户信息
export function userInfoApi(parameter, loadText) {
  return request({
    url: api.userInfo,
    method: 'GET',
    params: parameter,
    auth: true,
    loadText
  })
}