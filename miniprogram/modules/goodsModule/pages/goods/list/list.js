import { reqGoodsList } from '@/api/goods'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品列表数据
    isFinish: false, // 判断数据是否加载完毕
    total: 0,
    isLoading: false,
    requestData: {
      page: 1,
      limit: 10,
      category1Id: '',
      category2Id: ''
    }
  },

  // 返回上级页面
  gotoBack() {
    wx.navigateBack()
  },

  // 获取商品列表
  async getGoodsList() {
    // 数据真正请求中
    this.data.isLoading = true
    // 提示用户数据加载中
    wx.showLoading({
      title: '数据加载中...'
    })
    const { data } = await reqGoodsList(this.data.requestData)
    // 数据加载完成并关闭提示
    this.data.isLoading = false
    wx.hideLoading()
    this.setData({
      goodsList: [...this.data.goodsList, ...data.records],
      total: data.total
    })
  },

  // 页面上拉监听事件
  onReachBottom() {
    // 从页面数据中解构出需要的值
    const { total, goodsList, requestData, isLoading } = this.data
    // 从页面 data 中的请求数据对象中解构出 page 属性
    let { page } = requestData
    // 如果 isLoading 等于 true 则表示数据加载未完成，不继续加载下一页数据
    if (isLoading) return
    // 如果当前商品数组的长度等于商品总数则表示加载完成
    // 加载完成后给用户提示，同时不继续加载下一个数据
    if (goodsList.length === total) {
      this.setData({
        isFinish: true
      })
      return
    }
    // 将 page 的值加1并更新 requestData 的值，以请求下一页的数据
    this.setData({
      // 复制 requestData 对象的值并与 page 合并（即更新对象中 page 属性的值）
      requestData: { ...this.data.requestData, page: page + 1 }
    })
    // 重新请求商品列表
    this.getGoodsList()
  },

  // 页面下拉监听事件
  async onPullDownRefresh() {
    // 初始化页面数据
    this.setData({
      goodsList: [], // 商品列表数据
      isFinish: false, // 判断数据是否加载完毕
      total: 0,
      requestData: { ...this.data.requestData, page: 1 }
    })
    // 重新请求商品列表
    await this.getGoodsList()
    // 手动关闭下拉刷新效果
    wx.stopPullDownRefresh()
  },

  onLoad(options) {
    // 对象合并，从后向前合并，相同的属性将会被覆盖
    Object.assign(this.data.requestData, options)
    this.getGoodsList()
  }
})
