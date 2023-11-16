/**
 * @description 请求接口封装
 * @author 
 * */

import { BASE_URL } from '@/config/env.js'
let hasInvalid = false // token失效，不同地方多次调用此变量也可以被访问

/**
 * @description 请求方法封装
 * @desc 错误统一拦截
 * @desc token过期统一处理
 * @desc then里会返回所有的业务状态码，所以不是200的要返回提示
 * @desc catch里只拦截接口请求错误，如404、401、500和fail里的错误
 * 把这些错误统一成一种格式返回提示
 * @param {String} [url] - 请求地址
 * @param {String} [method] - 请求方法
 * @param {Object} [params] - 请求参数 {}
 * @param {Boolean} [auth] - 是否授权
 * @param {String} [loadText] - 加载动画提示，默认无
 * @param {Object} [headers] - 自定义请求头
 * @example request({})
 * */
function request({ url, method, params, auth, loadText, headers }) {
  return new Promise((resolve, reject) => {
    if (loadText) {
      uni.showLoading({
        title: loadText
      })
    }

    let header = {
      ...headers,
      'content-type': 'application/json'
    }
    if (uni.getStorageSync('token') && auth) {
      header['Authorization'] = uni.getStorageSync('token')
    }

    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data: params,
      header,
      success(res) {
        uni.hideLoading()
        const { statusCode, data } = res
        if (statusCode == 401) {
          if (hasInvalid) return // 已经有失效跳转到登录
          uni.showToast({
            title: '登录过期',
            icon: 'none',
            duration: 1500
          })
          hasInvalid = true
          const pages = getCurrentPages()
          const currentPage = pages[pages.length - 1]
          const { route, options } = currentPage
          if (route === 'pages/empower/index') {
            reject({
              message: `请求失败：${data.msg}`,
              data: res
            })
            hasInvalid = false
            return
          }
          setTimeout(() => {
            // const url = `/pages/empower/index?redirect=${encodeRedi}`
            const url = '/pages/empower/index'
            uni.reLaunch({
              url
            })
            hasInvalid = false
          }, 1500)
        } else {
          resolve(data)
        }
      },
      fail(err) {
        uni.hideLoading()
        reject({
          message: err.message,
          data: err
        })
      }
    })
  })
}

export default request
