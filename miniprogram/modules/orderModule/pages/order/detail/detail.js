import { reqOrderAddress, reqOrderDetail, reqBuyNowGoods, reqSubmitOrder, reqPreBuyInfo, reqPayStatus } from '@/api/order'
import { formatTime } from '@/utils/formatTime'
import { toast } from '@/utils/extendApi'
// 引入async-validator,对参数进行验证
import Schema from 'async-validator'
// 获取 App 实例
const app = getApp()

Page({
  data: {
    buyName: 'dasd', // 订购人姓名
    buyPhone: '13285462310', // 订购人手机号
    orderAddress: {}, // 订单收货地址
    orderInfo: {}, // 订单详情
    deliveryDate: '', // 期望送达日期
    blessing: '', // 祝福语
    show: false, // 期望送达日期弹框
    minDate: new Date().getTime(),
    currentDate: new Date().getTime()
  },

  async orderSubmit() {
    const { buyName, buyPhone, orderAddress, orderInfo, deliveryDate, blessing } = this.data

    const params = {
      buyName,
      buyPhone,
      cartList: orderInfo.cartVoList,
      deliveryDate,
      remarks: blessing,
      userAddressId: orderAddress.id
    }

    const { valid } = await this.validatePerson(params)

    if (!valid) return

    const { code, data } = await reqSubmitOrder(params)

    if (code === 200) {
      this.orderNo = data
      this.advancePay()
    }
  },

  // 获取预付单信息和参数
  async advancePay() {
    try {
      const payParams = await reqPreBuyInfo(this.orderNo)
      if (payParams.code === 200) {
        // const payInfo = await wx.requestPayment(payParams.data)
        if (1 === 1) {
          // const payStatus = await reqPayStatus(this.orderNo)
          if (1 === 1) {
            wx.redirectTo({
              url: '/modules/orderModule/pages/order/list/list',
              success: () => {
                toast({
                  icon: 'success',
                  title: '支付成功'
                })
              }
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
      toast({
        title: '支付遇到问题',
        icon: 'error'
      })
    }
  },
  // 订单信息表单验证
  validatePerson(params) {
    // 验证订购人，是否只包含大小写字母、数字和中文字符
    const nameReg = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'

    // 验证手机号，是否符合中国大陆手机号码的格式
    const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'

    // 创建验证规则
    const rules = {
      buyName: [
        { required: true, message: '请输入订购人姓名' },
        { pattern: nameReg, message: '订购人姓名不合法' }
      ],
      buyPhone: [
        { required: true, message: '请输入订购人手机号' },
        { pattern: phoneReg, message: '订购人手机号不合法' }
      ],
      userAddressId: { required: true, message: '请选择收货地址' },
      deliveryDate: { required: true, message: '请选择送达时间' }
    }

    // 创建 validator 实例
    const validator = new Schema(rules)

    // 以 Promise 的形式返回验证信息
    return new Promise((resolve) => {
      validator.validate(params, (errors) => {
        if (errors) {
          // 如果验证失败，对用户进行提示
          wx.toast({ title: errors[0].message })
          // 返回验证成功的信息
          resolve({ valid: false })
        } else {
          // 否则返回验证失败信息
          resolve({ valid: true })
        }
      })
    })
  },
  // 选择期望送达日期
  onShowDateTimerPopUp() {
    this.setData({
      show: true
    })
  },

  // 期望送达日期确定按钮
  onConfirmTimerPicker(event) {
    const dateRes = formatTime(new Date(event.detail))
    this.setData({
      deliveryDate: dateRes,
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

  // 获取订单信息
  async getOrderInfo() {
    // 从页面数据对象中解构商品ID和祝福语信息
    const { goodsId, blessing } = this.data
    // 如果商品ID存在，则表示是点击立即购买来到此页面
    // 如果用户点击的是立即购买则调用获取立即购买商品详情的接口
    // 如果用户是从购物车页面来到此页面则调用获取订单详情数据接口
    const { data: orderInfo } = goodsId ? await reqBuyNowGoods({ goodsId, blessing }) : await reqOrderDetail()
    // 从返回的订单详情信息中的已选择商品列表中找到第一个包含祝福语的商品
    const orderGoods = orderInfo.cartVoList.find((item) => item.blessing !== '')
    this.setData({
      // 将返回的商品信息赋值给 data
      orderInfo,
      // 如果全都不含有祝福语则赋值为空字符串，否则赋值找到的祝福语
      blessing: !orderGoods ? '' : orderGoods.blessing
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
  },

  // 页面加载时获取参数并赋值
  onLoad(options) {
    this.setData({
      ...options
    })
  }
})
