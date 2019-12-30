import request from '../utils/request'

/**
 * 获取分类列表
 * @returns {AxiosPromise}
 */
export function getStoreList () {
  return request({
    url: `classifies`,
    method: 'GET'
  })
}
