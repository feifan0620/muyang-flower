// 导入封装好的网络请求模块
import http from '../utils/http'

/**
 * @description 通过并发请求获取首页数据
 * @returns Promise
 */
export const reqIndexData = () => {
  return http.all(
    http.get('/index/findBanner'),
    http.get('/index/findCategory1'),
    http.get('/index/advertisement'),
    http.get('/index/findListGoods'),
    http.get('/index/findRecommendGoods')
  )
}
