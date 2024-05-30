import { reqOrderList } from '@/api/order'
Page({
  // 页面的初始数据
  data: {
    orderList: [], // 订单列表
    page: 1, // 页码
    limit: 10, // 每页展示的条数
    total: 0, // 订单列表总条数
    isLoading: false // 判断数据是否加载完毕
  },

  // 获取订单列表
  async getOrderList() {
    // 从 data 中结构参数
    const { page, limit } = this.data
    // 数据正在请求中
    this.isLoading = true
    // 调用接口获取订单列表数据
    const res = await reqOrderList(page, limit)
    // 数据加载完毕
    this.isLoading = false
    if (res.code === 200) {
      // 订单数据获取成功后将原订单数据和新获取的订单数据合并
      this.setData({
        orderList: [...this.data.orderList, ...res.data.records],
        total: res.data.total // 订单总数
      })
    }
  },

  // 页面上拉触底事件的处理函数
  onReachBottom() {
    // 解构数据
    const { page, total, isLoading, orderList } = this.data
    // 数据节流：判断是否加载完毕，如果 isLoading 等于 true
    // 说明数据还没有加载完毕，不加载下一页数据
    if (isLoading) return

    // 数据总条数 和 订单列表长度进行对比
    if (orderList.length === total) {
      return wx.toast({ title: '数据加载完成' })
    }
    // 更新 page
    this.setData({
      page: page + 1
    })
    // 重新发送请求
    this.getOrderList()
  },

  // 页面加载时获取订单数据
  onLoad() {
    this.getOrderList()
  }
})
