// pages/cart/component/cart.js
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { userStore } from '@/stores/userStore'
import { reqCartList, reqCheckCart, reqCheckAllCart, reqAddToCart, reqDelGoods } from '@/api/cart'
import { debounce } from 'miniprogram-licia'
import { swipeCellBehavior } from '@/behavior/swipeCellBehavior'
import { modal, toast } from '@/utils/extendApi'
// 导入 miniprogram-computed 的 behavior
const computedBehavior = require('miniprogram-computed').behavior
ComponentWithStore({
  behaviors: [computedBehavior, swipeCellBehavior],

  // 计算属性 computed 函数中不能访问 this ，只有 data 对象可供访问
  computed: {
    // 全选状态，返回值将会被设置到 this.data.selectAllStatus 字段中
    selectAllStatus(data) {
      // cartList数组不为空且数组中的每个元素都为选中状态才返回 true ,否则返回 false
      return data.cartList.length !== 0 && data.cartList.every((item) => item.isChecked === 1)
    },
    // 选中商品的总价
    totalPrice(data) {
      let totalPrice = 0
      data.cartList.forEach((item) => {
        if (item.isChecked === 1) {
          totalPrice += item.price * item.count
        }
      })
      return totalPrice
    }
  },
  storeBindings: {
    store: userStore,
    fields: ['token']
  },
  // 组件的属性列表
  properties: {},

  // 组件的初始数据
  data: {
    cartList: [],
    emptyDes: '还没有添加商品，快去添加吧～'
  },

  // 组件的方法列表
  methods: {
    // 获取购物车商品列表
    async getCartList() {
      // 如果 token 不存在则表示用户未登录，提示用户进行登录
      if (!this.data.token) {
        this.setData({
          cartList: [],
          emptyDes: '您尚未登录，点击登录获取更多权益'
        })
        return
      }
      // 如果已经登录则请求购物侧商品信息列表
      const { data: cartList, code } = await reqCartList()
      // 获取成功后对购物车列表进行赋值
      // 若购物车列表为空则提示用户:"还没有添加商品，快去添加吧~"
      if (code === 200) {
        this.setData({
          cartList,
          emptyDes: cartList.length === 0 && '还没有添加商品，快去添加吧~'
        })
      }
    },
    // 更新商品选中状态
    async updateChecked(event) {
      // 获取点击状态
      const { detail } = event
      // 获取商品id和商品索引
      const { id, index } = event.target.dataset
      // 给 isChecked 赋值，如果为true则
      const isChecked = detail ? 1 : 0
      const res = await reqCheckCart(id, isChecked)
      if (res.code === 200) {
        this.setData({
          [`cartList[${index}].isChecked`]: isChecked
        })
      }
    },
    // 全选和全不选功能
    async updateAllStatus(event) {
      // 从事件对象中获取全选状态
      const isAllChecked = event.detail ? 1 : 0
      // 调用接口，更新服务端的购物车商品全选状态
      const res = await reqCheckAllCart(isAllChecked)
      if (res.code === 200) {
        // this.data.cartList.forEach(item =>{
        //   this.setData(
        //     item.isChecked = isAllChecked
        //   )
        // })
        // 频繁调用this.setData()会产生性能问题，所有不能直接对原数组的每一项赋值
        // 对 cartList 进行深拷贝，对新数组的每一项遍历，再将新数组的值赋给原数组
        const newCartList = JSON.parse(JSON.stringify(this.data.cartList))
        // 对商品列表中的每个元素进行遍历，使其都为选中或不选中状态
        newCartList.forEach((item) => {
          item.isChecked = isAllChecked
        })
        // 同步修改本地数据
        this.setData({
          cartList: newCartList
        })
      }
    },
    // 更新商品购买数量
    changeBuynum: debounce(async function (event) {
      // 如果商品购买数量大于200，则将数据重置为200
      let newbuynum = event.detail > 200 ? 200 : event.detail
      // 从事件对象中结构出商品ID、商品索引和原购买数量
      const { id: goodsId, index, oldbuynum } = event.target.dataset
      // 使用正则验证购买数量是否在1到200之间
      const reg = /^([1-9]|[1-9]\d|1\d{2}|200)$/
      const regRes = reg.test(newbuynum)
      // 如果验证不通过则将购买数量重置为原购买数量并不继续执行后续逻辑
      if (!regRes) {
        this.setData({
          [`cartList[${index}].count`]: oldbuynum
        })
        return
      }
      // 计算出购买数量差值
      const discount = newbuynum - oldbuynum
      // 若差值为0，即购买数量没有改变，就不把数据发送给服务器
      if (discount === 0) return
      // 将改变后的数据发送给服务器
      const res = await reqAddToCart({ goodsId, count: discount })
      // 发送成功后同步修改本地数据
      if (res.code === 200) {
        this.setData({
          [`cartList[${index}].count`]: newbuynum,
          // 如果购买数量发生改变则选中此商品
          [`cartList[${index}].isChecked`]: 1
        })
      }
    }, 500),
    // 删除购物车中的商品
    async delCartGoods(event) {
      const { id: goodsId } = event.target.dataset
      const modalRes = await modal({
        content: '您确定要删除该商品吗？'
      })
      if (modalRes) {
        await reqDelGoods(goodsId)
        this.getCartList()
      }
    },
    // 跳转到订单结算页面
    toOrder() {
      if (this.data.totalPrice === 0) {
        toast({
          title: '请选择需要购买的商品'
        })
        return
      }
      wx.navigateTo({
        url: '/modules/orderModule/pages/order/detail/detail'
      })
    },
    // 页面显示时调用
    onShow() {
      this.getCartList()
    },
    // 页面隐藏时调用
    onHide() {
      // 关闭所有滑块
      this.onSwipeCellCommonClick()
    }
  }
})
