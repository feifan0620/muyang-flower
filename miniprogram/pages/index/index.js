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

  // 获取首页数据
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

  // 页面加载钩子函数
  onLoad() {
    this.getIndexData()
  },

  // 发送页面到好友、群聊功能
  onShareAppMessage() {
    return {
      title: '所有的怦然心动，都是你',
      path: '/pages/index/index',
      imageUrl: '../../assets/images/love.jpg'
    }
  },

  // 发送到朋友圈
  onShareTimeline() {}
})
