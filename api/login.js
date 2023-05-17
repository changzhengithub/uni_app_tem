import request from '@/utils/request'

const api = {
  login: '/api/common/login'
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