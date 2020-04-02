import request from '@/utils/request'

/**
 * 获取Pixiv
 * @param params
 * @returns {AxiosPromise}
 */
export function getData (params) {
  return request({
    url: `pixiv/v2/`,
    method: 'GET',
    params
  })
}
