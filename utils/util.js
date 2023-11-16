/**
 * @description 公共函数
 * @author changz
 * @import import { DeepClone } from '@/utils/util'
 * */


/**
 * @description 获取当前页面
 * @author changz
 * */
export function GetCurPage() {
  let pages = getCurrentPages()
  let curPage = pages[pages.length - 1]
  return curPage
}

/**
 * @description 深拷贝
 * @param {Any} [target] - 拷贝数据
 * @author changz
 * */
export function DeepClone(target) {
  // 引用类型
  if (typeof target === 'object' && target !== null) {
    const targeClone = Array.isArray(target) ? [] : {}
    for (const key in target) {
      targeClone[key] = DeepClone(target[key])
    }
    return targeClone
  } else {
    return target
  }
}

/**
 * @description 数组根据某个字段进行排序
 * @param {Array} [list] - 排序数组
 * @param {String} [field] - 排序字段
 * @param {String} [order] - asc 升序 desc 降序
 * @example SortArray(arr, 'age')
 * @author changz
 * */
export function SortArray(list, field, order = 'desc') {
  // 比较函数
  function compare(p) {
    return function (item1, item2) {
      const a = item1[p]
      const b = item2[p]
      if (order === 'desc') {
        return b - a // 降序
      } else {
        return a - b // 升序
      }
    }
  }
  const sortArr = list.sort(compare(field))
  return sortArr
}