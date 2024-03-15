// 获取 小程序帐号信息
const { miniProgram } = wx.getAccountInfoSync()

// 获取小程序当前开发环境
// develop 开发版, trial 体验版, release 正式版
const { envVersion } = miniProgram

let env = {
  baseURL: 'https://gmall-prod.atguigu.cn/mall-api'
}

switch (envVersion) {
  case 'develop':
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    break

  case 'trial':
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    break

  case 'release':
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    break

  default:
    break
}

export { env }
