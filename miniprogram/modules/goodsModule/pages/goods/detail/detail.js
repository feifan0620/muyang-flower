// pages/goods/detail/index.js
import { reqGoodsDetail } from '../../../../../api/goods'

Page({
  // 页面的初始数据
  data: {
    goodsInfo: {}, // 商品详情
    show: false, // 控制加入购物车和立即购买弹框的显示
    count: 1, // 商品购买数量，默认是 1
    blessing: '' // 祝福语
  },

  async getGoodsInfo() {
    const { data: goodsInfo } = await reqGoodsDetail(this.goodsId)
    this.setData({
      goodsInfo
    })
  },

  previewImage() {
    wx.previewImage({
      urls: this.data.goodsInfo.detailList
    })
  },

  // 加入购物车
  handleAddcart() {
    this.setData({
      show: true
    })
  },

  // 立即购买
  handeGotoBuy() {
    this.setData({
      show: true
    })
  },

  // 点击关闭弹框时触发的回调
  onClose() {
    this.setData({ show: false })
  },

  // 监听是否更改了购买数量
  onChangeGoodsCount(event) {
    console.log(event.detail)
  },

  // 页面首次加载时触发
  onLoad(options) {
    // 将参数 goodsId 挂载到页面实例上
    this.goodsId = options.goodsId ? options.goodsId : ''
    // 获取商品详情数据
    this.getGoodsInfo()
  }
})
