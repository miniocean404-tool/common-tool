import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro'

export default function createWeAPPStorage() {
  return {
    getItem: (key) => {
      return new Promise((resolve) => {
        resolve(getStorageSync(key))
      })
    },
    setItem: (key, item) => {
      return new Promise((resolve) => {
        setStorageSync(key, item)
        resolve()
      })
    },
    removeItem: (key) => {
      return new Promise((resolve) => {
        removeStorageSync(key)
        resolve()
      })
    },
  }
}
