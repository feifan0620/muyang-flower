import http from '@/utils/http'

/**
 * @description 获取订单详情
 * @returns Promise
 */
export const reqOrderDetail = () => {
  return http.get('/order/trade')
}

/**
 * @description 获取订单地址
 * @returns Promise
 */
export const reqOrderDetail = () => {
  return http.get('/userAddress/getOrderAddress')
}

/**
 * @description 立即购买
 * @param {*} params { goodsId:商品ID, blessing:祝福语 }
 * @returns Promise
 */
export const reqBuyNow = ({ goodsId, ...data }) => {
  return http.get(`/order/buy/${goodsId}`, data)
}

/**
 * @description 提交订单
 * @returns Promise
 */
export const reqSubmitOrder = () => {
  return http.post('/order/submitOrder')
}

/**
 * @description 获取微信预支付信息
 * @param {*} orderNo 订单 ID
 * @returns Promise
 */
export const reqPreBuyInfo = (orderNo) => {
  return http.get(`/webChat/createJsapi/${orderNo}`)
}

/**
 * @description 微信支付状态查询
 * @param {*} orderNo 订单 ID
 * @returns Promise
 */
export const reqPreBuyInfo = (orderNo) => {
  return http.get(`/webChat/queryPayStatus/${orderNo}`)
}

/**
 * @description 获取订单列表
 * @param {*} page 页码
 * @param {*} limit 每页请求条数
 * @returns Promise
 */
export const reqOrderList = (page, limit) => {
  return http.get(`/order/order/${page}/${limit}`)
}
