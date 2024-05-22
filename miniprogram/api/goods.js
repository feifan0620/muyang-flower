// 导入封装好的网络请求模块
import http from '../utils/http'

/**
 * @description 获取商品列表
 * @param {*} param { page, limit, category1Id, category2Id }
 * @returns Promise
 */
export const reqGoodsList = ({page,limit,...data}) => {
  return http.get(`/goods/list/${page}/${limit}`,data)
}

/**
 * @description 获取商品详情
 * @param {*} goodsId 商品id
 * @returns Promise
 */
export const reqGoodsDetail = (goodsId) => {
  return http.get(`/goods/${goodsId}`)
}
