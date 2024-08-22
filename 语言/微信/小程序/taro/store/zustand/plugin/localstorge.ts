import { getStorageSync, removeStorageSync, setStorageSync } from "@tarojs/taro"

export const createWeAPPStorage = {
  getItem(key: string): string | null | Promise<string | null> {
    return new Promise((resolve) => {
      resolve(getStorageSync(key))
    })
  },
  setItem(key: string, item: string): unknown | Promise<unknown> {
    return new Promise<void>((resolve) => {
      setStorageSync(key, item)
      resolve()
    })
  },
  removeItem(key: string): unknown | Promise<unknown> {
    return new Promise<void>((resolve) => {
      removeStorageSync(key)
      resolve()
    })
  },
}
