import http from '../utils/http'

/**
 * @description 授权登录
 * @param {*} code 临时登录凭证code
 * @returns Promise
 */
export const reqLogin = (code) => {
  return http.get(`/weixin/wxLogin/${code}`)
}

/**
 * @description 获取用户信息
 * @returns Promise
 */
export const reqUserInfo = () => {
  return http.get('/weixin/getuserInfo')
}

/**
 * @description 将本地资源上传到开发者服务器
 * @param {*} filePath 上传的文件资源路径
 * @param {*} name 文件对应的 key
 * @returns Promise
 */
export const reqUploadFile = (filePath, name) => {
  return http.upload('/fileUpload', filePath, name)
}

/**
 * @description 更新用户信息
 * @param {*} updateUser 用户头像和用户昵称
 * @returns Promise
 */
export const reqUpdateUserInfo = (updateUser) => {
  return http.post('/weixin/updateUser', updateUser)
}
