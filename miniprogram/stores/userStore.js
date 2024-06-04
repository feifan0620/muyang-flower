// 导入 observable 函数用于创建可观察对象
// 导入 action 修改 store 中的可观察状态
import { observable, action } from 'mobx-miniprogram'
import { getStorage } from '../utils/storage'

// 创建 store 对象，存储应用的状态
export const userStore = observable({
  // 创建可观察状态 token
  token: getStorage('token') || '',
  // 创建可观测状态 userInfo
  userInfo: wx.getStorageSync('userInfo') || {},
  // 对 token 进行修改
  setToken: action(function (token) {
    this.token = token
  }),
  // 设置用户信息
  setUserInfo: action(function (userInfo) {
    this.userInfo = userInfo
  })
})
