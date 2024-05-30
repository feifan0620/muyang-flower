import { reqLogin, reqUserInfo } from '../../api/user'
import { toast } from '../../utils/extendApi'
import { userStore } from '../../stores/userStore'
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { debounce } from 'miniprogram-licia'

ComponentWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo'],
    actions: ['setToken', 'setUserInfo']
  },

  methods: {
    // 点击登录
    login: debounce(function () {
      // 调用 wx.login 获取用户信息
      wx.login({
        success: async ({ code }) => {
          if (code) {
            // 调用接口 API，传入 code 进行登录
            const { data } = await reqLogin(code)
            // 登录成功以后将 token 存储到本地
            wx.setStorageSync('token', data.token)
            // 将数据存储到 store 对象中
            this.setToken(data.token)
          } else {
            // 登录失败后给用户进行提示
            toast({ title: '授权失败，请稍后再试~~~' })
          }
          toast({
            title: '',
            icon: 'loading'
          })
          // 调用接口 API，获取用户信息
          const { data } = await reqUserInfo()
          // 将用户信息存储到本地
          wx.setStorageSync('userInfo', data)
          // 将用户信息存储到 store 对象中
          this.setUserInfo(data)
          // 返回之前的页面
          wx.navigateBack()
          // toast({ title: '授权登陆成功' })
        }
      })
    }, 500)
  }
})
