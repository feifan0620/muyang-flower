// miniprogram\utils\instance.js
import WxRequest from 'mina-request'
import { getStorage, clearStorage } from './storage'
import { modal, toast } from './extendApi'
import { env } from './env'

// 对 WxRequest 进行实例化
const instance = new WxRequest({
  baseURL: env.baseURL,
  timeout: 15000,
  isLoading: false
})

// 配置请求拦截器
instance.interceptors.request = (config) => {
  // 在请求发送之前做点什么……

  // 在发送请求之前，需要先判断本地是否存在访问令牌 token
  const token = getStorage('token')

  // 如果存在 token，就需要在请求头中添加 token 字段
  if (token) {
    config.header['token'] = token
  }

  return config
}

// 配置响应拦截器
instance.interceptors.response = async (response) => {
  // 从 response 中解构 isSuccess
  const { isSuccess, data } = response

  // 如果 isSuccess 为 false，说明执行了 fail 回调函数
  // 这时候就说明网络异常，需要给用户提示网络异常
  if (!isSuccess) {
    wx.showToast({
      title: '网络异常请重试',
      icon: 'error'
    })

    return response
  }

  // 判断服务器响应的业务状态码
  switch (data.code) {
    // 如果后端返回的业务状态码等于 200，说请求成功，服务器成功响应了数据
    case 200:
      // 对服务器响应数据做点什么……
      return data

    // 如果返回的业务状态码等于 208，说明 没有 token，或者 token 失效
    // 就需要让用户登录或者重新登录
    case 208:
      const res = await modal({
        content: '鉴权失败，请重新登录',
        showCancel: false // 不显示取消按钮
      })

      if (res) {
        // 清除之前失效的 token ，同时要清除本地存储的全部信息
        clearStorage()

        wx.navigateTo({
          url: '/pages/login/login'
        })
      }

      return Promise.reject(response)

    default:
      toast({
        title: '程序出现异常，请联系客服或稍后重试'
      })

      return Promise.reject(response)
  }
}

// 将 WxRequest 实例进行暴露出去，方便在其他文件中进行使用
export default instance
