import { reqAddressList, reqDeleteAddress } from '@/api/address'
import { swipeCellBehavior } from '@/behavior/swipeCellBehavior'

const app = getApp()

Page({
  behaviors: [swipeCellBehavior],

  // 页面的初始数据
  data: {
    addressList: []
  },

  // 获取收货地址列表
  async getAddressList() {
    const { data: addressList } = await reqAddressList()
    this.setData({
      addressList: addressList
    })
  },

  // 删除收货地址
  async delAddress(event) {
    // 获取当前收货地址id
    const { id } = event.currentTarget.dataset
    // 询问用户是否删除收货地址
    const modalRes = await wx.modal({ content: '您确定要删除当前收货地址吗？' })
    // 如果用户点击确定，则删除当前地址并重新获取收货地址列表
    if (modalRes) {
      await reqDeleteAddress(id)
      wx.toast({ title: '删除收货地址成功' })
      this.getAddressList()
    }
  },

  // 去编辑页面
  toEdit(event) {
    // 从事件对象中获取地址ID
    const { id } = event.currentTarget.dataset
    // 跳转到编辑页面并将获取到的 ID 作为参数传递过去
    wx.navigateTo({
      url: `/modules/settingModule/pages/address/add/index?id=${id}`
    })
  },

  // 更换收货地址
  changeAddress(event) {
    // 如果参数 flag 不等于1，即不是从订单详情页跳转到当前页面，则不继续执行后续逻辑
    if (this.flag !== '1') return
    // 从事件对象中获取地址 ID
    const addressId = event.currentTarget.dataset.id
    // 使用获取到地址 ID 从当前页面数据的 addressList 数组中找到对应的地址，即需要更换成的地址
    const address = this.data.addressList.find((item) => item.id === addressId)
    // 如果获取成功则赋给全局数据对象中的 address 并返回上一个页面
    if (address) {
      app.globalData.address = address
      wx.navigateBack()
    }
  },

  // 页面加载时获取参数 flag并挂载到当前页面的实例上
  onLoad(options) {
    this.flag = options.flag
  },
  // 页面显示时获取地址列表
  onShow() {
    this.getAddressList()
  }
})
