import QQMapWX from '../../../../../libs/qqmap-wx-jssdk'

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
  saveAddrssForm(event) {
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
    console.log(params)
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
    const { latitude, longitude, name } = await wx.chooseLocation()
    this.qqmapsdk.reverseGeocoder({
      // 传入经、纬度
      location: {
        latitude,
        longitude
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  onLoad() {
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: 'NBTBZ-NC5C4-RVKUT-KISEQ-DNRM6-TDB6U'
    })
  }
})
