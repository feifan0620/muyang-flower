// 导入封装好的网络请求模块
import instance from '../utils/http'

/**
 * 通过并发请求获取首页的数据
 */
export const reqIndexData = () => {
  return instance.all(
    instance.get('/index/findBanner'),
    instance.get('/index/findCategory1'),
    instance.get('/index/advertisement'),
    instance.get('/index/findListGoods'),
    instance.get('/index/findRecommendGoods')
  )
}
