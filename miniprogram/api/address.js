import http from '../utils/http'

/**
 * @description 新增收货地址
 * @param {*} data 收货地址数据
 * @returns Promise
 */
export const reqAddAddress = (data) => {
  return http.post('/userAddress/save', data)
}

/**
 * @description 获取收货地址列表
 * @returns Promise
 */
export const reqAddressList = () => {
  return http.get('/userAddress/findUserAddress')
}

/**
 * @description 获取收货地址详情
 * @param {*} id 收货地址 id
 * @returns Promise
 */
export const reqAddressInfo = (id) => {
  return http.get(`/userAddress/${id}`)
}

/**
 * @description 更新收货地址
 * @param {*} data 更新的收货地址数据
 * @returns Promise
 */
export const reaUpdateAddress = (data) => {
  return http.post('/userAddress/update', data)
}

/**
 * @description 删除收货地址
 * @param {*} id 收货地址 id
 * @returns Promsie
 */
export const reqDeleteAddress = (id) => {
  return http.get(`/userAddress/delete/${id}`)
}
