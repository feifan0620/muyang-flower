export const swipeCellBehavior = Behavior({
  data: {
    swipeCellQueue: [] // 实例存储队列
  },

  methods: {
    // 打开滑块时，将实例存储到队列中
    onSwipeCellOpen(event) {
      const instance = this.selectComponent(`#${event.target.id}`)
      this.data.swipeCellQueue.push(instance)
    },

    // 点击其他滑块时，关掉开启的滑块
    onSwipeCellClick() {
      this.onSwipeCellCommonClick()
    },

    // 点击页面空白区域时，关掉开启的滑块
    onSwipeCellPageTap() {
      this.onSwipeCellCommonClick()
    },

    // 关掉滑块的统一方法
    onSwipeCellCommonClick() {
      // 循环关闭开启的滑块
      this.data.swipeCellQueue.forEach(function (instance) {
        instance.close()
      })

      // 将滑块进行清空
      this.data.swipeCelQueue = []
    }
  }
})
