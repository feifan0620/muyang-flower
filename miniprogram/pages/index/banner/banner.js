// pages/index/banner/banner.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 轮播图数据
    bannerList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSwiperIndex(event) {
      this.setData({
        activeIndex: event.detail.current
      })
    }
  }
})
