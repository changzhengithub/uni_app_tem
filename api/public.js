import request from '@/utils/request'

// 接口地址
const api = {
  getUnitList: '/api/member/getUnitList', // 获取成员单位列表

  authStatus: '/api/unit/authStatus', // 获取单位认证状态
  addAuth: '/api/user/addAuth', // 添加认证
  userList: '/api/unit/user/userList', // 获取用户列表
  userAllList: '/api/unit/user/simpleUserList', // 获取全部用户
  bindQrCode: '/api/unit/user/bindQrCode', // 获取绑定微信需要扫描的二维码
  checkBindStatus: '/api/unit/user/checkBindStatus', // 检查绑定状态
  getSystemInfo: '/api/common/getSystemInfo', // 获取系统信息
  getUnitConfig: '/api/unit/getUnitConfig' // 单位配置详情
}

// 获取成员单位列表
export function getUnitListApi(parameter, loadText) {
  return request({
    url: api.getUnitList,
    method: 'GET',
    params: parameter,
    loadText
  })
}

// 获取单位认证状态
export function authStatusApi(parameter, loadText) {
  return request({
    url: api.authStatus,
    method: 'GET',
    params: parameter,
    loadText
  })
}

// 添加认证
export function addAuthApi(parameter, loadText) {
  return request({
    url: api.addAuth,
    method: 'post',
    params: parameter,
    loadText
  })
}

// 获取用户列表
export function userListApi(parameter, loadText) {
  return request({
    url: api.userList,
    method: 'GET',
    params: parameter,
    loadText
  })
}

export function userAllListApi(parameter, loadText) {
  return request({
    url: api.userAllList,
    method: 'GET',
    params: parameter,
    loadText
  })
}

// 获取绑定微信需要扫描的二维码
export function bindQrCodeApi(parameter, loadText) {
  return request({
    url: api.bindQrCode,
    method: 'GET',
    params: parameter,
    loadText
  })
}

// 检查绑定状态
export function checkBindStatusApi(parameter, loadText) {
  return request({
    url: api.checkBindStatus,
    method: 'GET',
    params: parameter,
    loadText
  })
}

// 获取系统信息
export function getSystemInfoApi(parameter, loadText) {
  return request({
    url: api.getSystemInfo,
    method: 'GET',
    params: parameter,
    loadText
  })
}

// 单位配置详情
export function getUnitConfigApi(parameter, loadText) {
  return request({
    url: api.getUnitConfig,
    method: 'GET',
    params: parameter,
    loadText
  })
}
