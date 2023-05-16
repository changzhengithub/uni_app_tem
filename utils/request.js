/**
 * @description 请求接口封装
 * @author changz
 * */ 

const BASE_URL = ''
let hasInvalid = false; // token失效，不同地方多次调用此变量也可以被访问

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
 * @param {String} [loadText] - 加载动画提示，默认无
 * @example request({})
 * @author changz
 * */
function request({url, method, params, loadText}) {
  return new Promise((resolve, reject) => {
    if (loadText) {
			uni.showToast({
				title: loadText
			})
    }
    
    let header = {
      'content-type': 'application/json'
    }
    if (wx.getStorageSync('token')) {
      header['Authorization'] = wx.getStorageSync('token');
    }
    
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data: params,
      header,
      success(res) {
        uni.hideToast()
        const { statusCode, data } = res;
        if (statusCode == 200) {
          resolve(data)
        } else if (statusCode == 401) {
          if (hasInvalid) return // 已经有失效跳转到登录
          uni.showToast({
            title: '登录过期',
            icon: 'none',
            duration: 1500
          })
          hasInvalid = true
          // 跳转到登录页
          const pages = getCurrentPages();
          const currentPage = pages[pages.length - 1];
          const { route, options } = currentPage
          let encodeRedi = ''
          if (route === 'pages/statement/index') {
            const { report_id } = options
            const redi = `/${currentPage.route}?report_id=${report_id}`;
            encodeRedi = encodeURIComponent(redi);
          }
          if (route === 'pages/warning-detail/index') {
            const { event_id } = options
            const redi = `/${currentPage.route}?event_id=${event_id}`;
            encodeRedi = encodeURIComponent(redi);
          }
          // if (route === 'pages/event-detail/index') {
          //   const { type, notice_id, event_ids } = options
          //   const redi = `/${currentPage.route}?type=${type}&notice_id=${notice_id}&event_ids=${event_ids}`;
          //   encodeRedi = encodeURIComponent(redi);
          // }
          setTimeout(() => {
            let url = '/pages/empower/index'
            if (encodeRedi) {
              url = `/pages/empower/index?redirect=${encodeRedi}`
            }
            wx.reLaunch({
              url,
              complete: function() {
                hasInvalid = false
              }
            })
          }, 1500)
        } else {
          reject({
            errMsg: `请求失败：${statusCode}`,
            data: res
          })
        }
      },
      fail(err) {
        uni.hideToast()
        reject({
          errMsg: err.errMsg,
          data: err
        })
      }
    })
  })
}

export default request