import { reqAddressList } from '../../../../../api/address'

Page({
  // 页面的初始数据
  data: {
    addressList: []
  },

  async getAddressList() {
    const { data: addressList } = await reqAddressList()
    this.setData({
      addressList: addressList
    })
  },

  // 去编辑页面
  toEdit() {
    wx.navigateTo({
      url: '/modules/settingModule/pages/address/add/index'
    })
  },

  onLoad() {
    this.getAddressList()
  }
})
