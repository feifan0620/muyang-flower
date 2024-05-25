import http from '@/utils/http'

/**
 * @description 商品加入购物车和购物车更新商品数量
 * @param {*} param { goodsId:商品ID, count:商品数量, blessing:祝福语 }
 * @returns Promsie
 */
export const reqAddToCart = ({ goodsId, count, ...data }) => {
  return http.get(`/cart/addToCart/${goodsId}/${count}`, data)
}

/**
 * @description 获取购物车列表
 * @returns Promise
 */
export const reqCartList = () => {
  return http.get('/cart/getCartList')
}

/**
 * @description 更新商品选中状态
 * @param {*} goodsId 商品id
 * @param {*} isChecked 更新后的状态，0 不勾选，1 勾选
 * @returns Promise
 */
export const reqCheckCart = (goodsId, isChecked) => {
  return http.get(`/cart/checkCart/${goodsId}/${isChecked}`)
}

/**
 * @description 全选与全不选
 * @param {*} isChecked 0 取消全选，1 全选
 * @returns Promise
 */
export const reqCheckAllCart = (isChecked) => {
  return http.get(`/cart/checkAllCart/${isChecked}`)
}

/**
 * @description 删除购物车商品
 * @param {*} goodsId 商品id
 * @returns	Promise
 */
export const reqDelGoods = (goodsId) => {
  return http.get(`/cart/delete/${goodsId}`)
}
