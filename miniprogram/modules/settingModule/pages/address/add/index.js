import { reqAddAddress, reqAddressInfo, reaUpdateAddress } from '../../../../../api/address'
// 引入QQMapWX核心类
import QQMapWX from '../../../../../libs/qqmap-wx-jssdk'
// 引入async-validator
import Schema from 'async-validator'
//

Page({
  // 页面的初始数据
  data: {
    name: '', //收货人
    phone: '', //手机号码
    provinceName: '', //省
    provinceCode: '', //省编码
    cityName: '', //市
    cityCode: '', //市编码
    districtName: '', //区
    districtCode: '', //区编码
    address: '', //详细地址
    fullAddress: '', //完整地址
    isDefault: 0 //是否为默认地址,0：否 1：是
  },

  // 保存收货地址
  async saveAddrssForm(event) {
    // 从data中解构出省市区和详细地址以及是否为默认地址
    const { provinceName, cityName, districtName, address, isDefault } = this.data
    // 使用解构出的数据拼接出完整地址
    const fullAddress = provinceName + cityName + districtName + address
    // 合并借口请求参数
    const params = {
      ...this.data,
      fullAddress,
      isDefault: isDefault ? 1 : 0
    }

    // 对请求参数进行验证
    const { valid } = await this.validateAddress(params)

    // 如果验证失败，不继续执行后续的逻辑
    if (!valid) return

    // 如果 addressId 不为空则执行更新操作，否则执行新增操作
    const res = this.addressId ? await reaUpdateAddress(params) : await reqAddAddress(params)
    if (res.code === 200) {
      // 返回上级页面并给用户对应提示
      wx.navigateBack({
        success: () => {
          wx.toast({ title: this.addressId ? '更新收货地址成功' : '新增收货地址成功' })
        }
      })
    }
  },

  // 省市区选择
  onAddressChange(event) {
    // 从时间对象中结构出省市区和编码数据
    const [provinceName, cityName, districtName] = event.detail.value
    const [provinceCode, cityCode, districtCode] = event.detail.code
    // 存储省市区和编码数据
    this.setData({
      provinceName,
      provinceCode,
      cityName,
      cityCode,
      districtName,
      districtCode
    })
  },

  // 获取用户地理位置
  async onLocation() {
    try {
      const { latitude, longitude, name } = await wx.chooseLocation()
      this.qqmapsdk.reverseGeocoder({
        // 传入经、纬度
        location: {
          latitude,
          longitude
        },
        success: (res) => {
          // 获取省市区名称和行政编码
          const { province, city, district, adcode } = res.result.ad_info
          // 获取街道名称和门牌号
          const { street, street_number } = res.result.address_component
          // 获取标准地址
          const { standard_address } = res.result.formatted_addresses
          // 组织并格式化地址信息，然后赋值给data中的字段
          this.setData({
            // 省名称
            provinceName: province,
            // 省编码，即 adcode 前两位加 0000
            provinceCode: adcode.replace(adcode.substring(2, 6), '0000'),
            // 市名称
            cityName: city,
            // 市编码，即 adcode 前四位位加 00
            cityCode: adcode.replace(adcode.substring(4, 6), '00'),
            // 区名称
            districtName: district,
            // 区编码，即 adcode，如果区不存在则为空
            districtCode: district && adcode,
            // 组织详细地址和完整地址
            address: street_number + name,
            fullAddress: standard_address + name
          })
        }
      })
    } catch (error) {
      console.log(error)
      wx.toast({ title: '您取消了定位' })
    }
  },

  // 收货地址表单验证
  validateAddress(params) {
    // 验证收货人，是否只包含大小写字母、数字和中文字符
    const nameRegExp = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'

    // 验证手机号，是否符合中国大陆手机号码的格式
    const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'

    // 创建验证规则
    const rules = {
      name: [
        { required: true, message: '请输入收货人姓名' },
        { pattern: nameRegExp, message: '收货人姓名不合法' }
      ],
      phone: [
        { required: true, message: '请输入收货人手机号' },
        { pattern: phoneReg, message: '收货人手机号不合法' }
      ],
      provinceName: { required: true, message: '请选择收货人所在地区' },
      address: { required: true, message: '请输入详细地址' }
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

  //显示收货地址信息
  async showAddressInfo(id) {
    // 如果id为空，则不执行后续逻辑，即当前页面为新增页面
    if (!id) return

    // 将 id 挂载到当前页面的实例(this)上
    this.addressId = id

    // 修改导航栏标题
    wx.setNavigationBarTitle({
      title: '更新收货地址'
    })

    // 获取收货地址详情
    const { data } = await reqAddressInfo(this.addressId)

    // 将收货地址信息回显到当前页面
    this.setData(data)
  },

  onLoad(options) {
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: 'NBTBZ-NC5C4-RVKUT-KISEQ-DNRM6-TDB6U'
    })
    // 显示 ID 对应的地址信息
    this.showAddressInfo(options.id)
  }
})
