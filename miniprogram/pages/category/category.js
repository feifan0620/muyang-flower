// 导入封装好的接口api函数
import { reqCategoryData } from '../../api/category'

Page({
  // 初始化数据
  data: {
    categoryList: [],
    activeIndex: 0
  },

  // 异步获取分类页面数据
  async getCategoryData() {
    const res = await reqCategoryData()
    this.setData({
      categoryList: res.data
    })
  },

  updateActive(event) {
    const { index } = event.currentTarget.dataset
    this.setData({
      activeIndex: index
    })
  },

  //监听页面的加载
  onLoad() {
    this.getCategoryData()
  }
})
