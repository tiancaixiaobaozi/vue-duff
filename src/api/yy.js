import request from '@/utils/request'

/**
 * 获取
 * @param params
 * @returns {AxiosPromise}
 */
export function getData (params) {
  return request({
    url: `hitokoto/`,
    method: 'GET',
    params
  })
}
