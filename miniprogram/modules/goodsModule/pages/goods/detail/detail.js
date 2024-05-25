// pages/goods/detail/index.js
import { reqGoodsDetail } from '@/api/goods'
import { userBehavior } from '@/behavior/userBehavior'
import { reqAddToCart, reqCartList } from '@/api/cart'
import { toast, modal } from '@/utils/extendApi'

Page({
  // 将当前页面与 userStore 绑定，以便获取用户 token 来判断是否登录
  behaviors: [userBehavior],
  // 页面的初始数据
  data: {
    goodsInfo: {}, // 商品详情
    show: false, // 控制加入购物车和立即购买弹框的显示
    count: 1, // 商品购买数量，默认是 1
    buynow: 0, // 0:加入购物车，1:立即购买
    blessing: '', // 祝福语
    allCount: 0 // 购物车商品总数量
  },

  // 获取商品详情信息
  async getGoodsInfo() {
    const { data: goodsInfo } = await reqGoodsDetail(this.goodsId)
    this.setData({
      goodsInfo
    })
  },

  // 全屏预览商品图片
  previewImage() {
    wx.previewImage({
      urls: this.data.goodsInfo.detailList
    })
  },

  // 加入购物车
  handleAddcart() {
    this.setData({
      show: true,
      buynow: 0
    })
  },

  // 立即购买
  handeGotoBuy() {
    this.setData({
      show: true,
      buynow: 1
    })
  },

  // 点击关闭弹框时触发的回调
  onClose() {
    this.setData({ show: false })
  },

  // 监听是否更改了购买数量
  onChangeGoodsCount(event) {
    this.setData({
      count: Number(event.detail)
    })
  },

  // 处理商品详情页点击事件（区分是加入购物车还是立即购买）
  async handleSubmit() {
    const { token, count, buynow, blessing } = this.data
    const goodsId = this.goodsId

    // 如果没有token，则代表用户未登录
    // 若与用户未登录则前往登录页面,并终止代码执行
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      toast({
        title: '您还没有登录',
        duration: 1000,
        mask: false
      })
      return
    }
    if (blessing === '') {
      modal({
        title: '提示',
        content: '请输入祝福语',
        showCancel: false
      })
      return
    }
    // 如果 buynow 为0，则用户点击的是加入购物车,否则为立即购买
    if (buynow === 0) {
      const res = await reqAddToCart({ goodsId, count, blessing })
      // 数据添加成功后对用户进行提示并刷新商品数量
      if (res.code === 200) {
        toast({ title: '加入购物车成功', mask: false, icon: 'success' })
        this.getCartCount()
        // 关闭弹出面板
        this.setData({
          show: false
        })
      }
    } else {
      wx.navigateTo({
        url: `/pages/order/detail/detail?goodsId=${goodsId}&blessing=${blessing}`
      })
    }
  },

  // 获取购物商品总数
  async getCartCount() {
    // 如果 token 不存在，说明用户没有登录，不继续执行后续逻辑
    if (!this.data.token) return
    // 如果用户已登录则请求获取购物车商品数据
    const { data } = await reqCartList()
    // 判断购物车中是否存在商品
    if (data.length !== 0) {
      // 将每个商品的数量进行累加，计算的出商品总数量
      let allCount = 0
      data.forEach((item) => {
        allCount += item.count
      })
      // 将计算得出的数据赋值给 allCount
      this.setData({
        // 将数值隐式转换成字符串以符合数据类型要求
        allCount: (allCount > 99 ? '99+' : allCount) + ''
      })
    }
  },

  // 页面首次加载时触发
  onLoad(options) {
    // 将参数 goodsId 挂载到页面实例上
    this.goodsId = options.goodsId ? options.goodsId : ''
    // 获取商品详情数据
    this.getGoodsInfo()
    // 获取购物车商品总数量
    this.getCartCount()
  }
})
