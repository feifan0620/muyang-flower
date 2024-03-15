// 导入首页数据请求api
import { reqIndexData } from '../../api/index'

Page({
  data: {
    bannerList: [], //轮播图
    categoryList: [], //分类导航
    activeList: [], //活动宣传
    guessList: [], //猜你喜欢
    hotList: [], //人气推荐
    loading: true
  },

  async getIndexData() {
    const res = await reqIndexData()
    this.setData({
      bannerList: res[0].data,
      categoryList: res[1].data,
      activeList: res[2].data,
      guessList: res[3].data,
      hotList: res[4].data,
      loading: false
    })
  },

  onLoad() {
    this.getIndexData()
  }
})
