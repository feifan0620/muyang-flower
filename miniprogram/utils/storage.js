/**
 * @description 存储数据
 * @param {*} key 本地缓存中指定的 key
 * @param {*} value 需要缓存的数据
 */
export const setStorage = (key, value) => {
  try {
    wx.setStorageSync(key, value)
  } catch (e) {
    console.error(`存储指定 ${key} 数据发生错误:`, e)
  }
}

/**
 * @description 从本地读取对应 key 的数据
 * @param {*} key 
 */
export const getStorage = (key) => {
  try {
    const value = wx.getStorageSync(key)
    if (value) {
      return value
    }
  } catch (e) {
    console.error(`获取指定 ${key} 数据发生错误:`, e)
  }
}

/**
 * @description 从本地移除指定 key 数据
 * @param {*} key 
 */
export const removeStorage = (key) => {
   try {
     wx.removeStorageSync(key)
   } catch (err) {
     console.error(`移除指定 ${key} 数据发生错误:`, e)
   }
}

/**
 * @description 从本地清空全部的数据
 */
export const clearStorage = () => {
  try {
    wx.clearStorageSync()
  } catch (e) {
    console.error("清空本地存储时发生错误:", e);
  }
}


/**
 * @description 将数据存储到本地 - 异步方法
 * @param {*} key 本地缓存中指定的 key
 * @param {*} data 需要缓存的数据
 */
export const asyncSetStorage = (key, data) => {
  return new Promise((resolve) => {
    wx.setStorage({
      key,
      data,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/**
 * @description 从本地读取指定 key 的数据 - 异步方法
 * @param {*} key
 */
export const asyncGetStorage = (key) => {
  return new Promise((resolve) => {
    wx.getStorage({
      key,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/**
 * @description 从本地移除指定 key 的数据 - 异步方法
 * @param {*} key
 */
export const asyncRemoveStorage = (key) => {
  return new Promise((resolve) => {
    wx.removeStorage({
      key,
      complete(res) {
        resolve(res)
      }
    })
  })
}

/**
 * @description 从本地移除、清空全部的数据 - 异步方法
 */
export const asyncClearStorage = () => {
  return new Promise((resolve) => {
    wx.clearStorage({
      complete(res) {
        resolve(res)
      }
    })
  })
}

