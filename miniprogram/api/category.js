// 导入封装好的网络请求模块
import http from '../utils/http'

/**
 * @description 获取分类页面的数据
 * @returns Promise
 */
export const reqCategoryData = () => {
  return http.get('/index/findCategoryTree')
}
