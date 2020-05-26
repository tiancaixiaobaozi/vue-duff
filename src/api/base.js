import request from '@/utils/request'

/**
 * 接口测试
 * @returns {AxiosPromise}
 */
export function getTestData () {
  return request({
    url: `test`,
    method: 'GET'
  })
}
