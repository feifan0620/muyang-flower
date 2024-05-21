import { reqAddressList, reqDeleteAddress } from '../../../../../api/address'
import { swipeCellBehavior } from '../../../../../behavior/swipeCellBehavior'

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

  onShow() {
    this.getAddressList()
  }
})
