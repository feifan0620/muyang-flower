import { userBehavior } from './behavior'
import { asyncSetStorage } from '../../../../utils/storage'
import { toast } from '../../../../utils/extendApi'
import { reqUserInfo } from '@/api/user'
import { reqUpdateUserInfo, reqUploadFile } from '../../../../api/user'
Page({
  behaviors: [userBehavior],
  // 页面的初始数据
  data: {
    isShowPopup: false // 控制更新用户昵称的弹框显示与否
  },

  // 更新用户头像
  async getAvatar(e) {
    // 从事件对象中获取临时头像url
    const { avatarUrl } = e.detail
    // 将临时头像url上传到服务器并获取永久头像url
    const { data } = await reqUploadFile(avatarUrl, 'file')
    // 同步更新data和页面中的头像数据
    this.setData({
      'userInfo.headimgurl': data
    })
  },

  // 更新用户昵称
  getNickname(e) {
    // 从事件对象中获取更新的用户昵称
    const { nickname } = e.detail.value
    // 更新用户昵称数据并关闭弹窗
    this.setData({
      'userInfo.nickname': nickname,
      isShowPopup: false
    })
  },

  // 更新用户信息
  async updateUserInfo() {
    // 将更新的用户数据上传到开发者服务器
    const res = await reqUpdateUserInfo(this.data.userInfo)
    if (res.code === 200) {
      // 将更新的用户数据存储到本地
      asyncSetStorage('userInfo', this.data.userInfo)
      // 将更新的用户数据存储到 userStore
      this.setUserInfo(this.data.userInfo)
      // 提示用户更新成功
      toast({
        title: '更新成功'
      })
    }
  },

  // 显示修改昵称弹框
  onUpdateNickName() {
    this.setData({
      // 显示当前的用户昵称
      'userInfo.nickname': this.data.userInfo.nickname,
      // 关闭弹窗
      isShowPopup: true
    })
  },

  // 弹框取消按钮
  cancelForm() {
    this.setData({
      isShowPopup: false
    })
  }
})
