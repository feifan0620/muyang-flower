import { reqOrderAddress, reqOrderDetail } from '@/api/order'
// 获取 App 实例
const app = getApp()

Page({
  data: {
    buyName: '', // 订购人姓名
    buyPhone: '', // 订购人手机号
    orderAddress: {}, // 订单收货地址
    orderInfo: {}, // 订单详情
    deliveryDate: '选择送达日期', // 期望送达日期
    blessing: '', // 祝福语
    show: false, // 期望送达日期弹框
    minDate: new Date().getTime(),
    currentDate: new Date().getTime()
  },

  // 选择期望送达日期
  onShowDateTimerPopUp() {
    this.setData({
      show: true
    })
  },

  // 期望送达日期确定按钮
  onConfirmTimerPicker(event) {
    this.setData({
      show: false
    })
  },

  // 期望送达日期取消按钮 以及 关闭弹框时触发
  onCancelTimePicker() {
    this.setData({
      show: false,
      minDate: new Date().getTime(),
      currentDate: new Date().getTime()
    })
  },

  // 获取订单地址
  async getAddress() {
    // 从全局数据对象中获取 address 对象
    if (app.globalData.address.id) {
      // 如果 address 中有地址数据，则将其赋给当前页面的 orderAddress 对象
      this.setData({
        orderAddress: app.globalData.address
      })
      // 清空重置 address 的值
      app.globalData.address = {}
      return
    }
    // 如果没有数据，则从服务器中获取默认地址数据
    const { data: orderAddress } = await reqOrderAddress()
    this.setData({
      orderAddress
    })
  },

  async getOrderInfo() {
    const { data: orderInfo } = await reqOrderDetail()
    const orderGoods = orderInfo.cartVoList.find((item) => item.blessing !== '')
    this.setData({
      orderInfo,
      blessing: orderGoods && orderGoods.blessing
    })
  },

  // 跳转到收货地址
  toAddress() {
    wx.navigateTo({
      url: '/modules/settingModule/pages/address/list/index'
    })
  },

  onShow() {
    // 页面显示时获取订单收货地址数据和订单详情数据
    this.getAddress()
    this.getOrderInfo()
  }
})
