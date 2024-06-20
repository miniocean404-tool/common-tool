import { getSystemInfoSync, pxTransform } from "@tarojs/taro"

const designWidth = 375

// 将设计稿 px 转换为当前设备等比 px
export function px2devicePx(px: string | number) {
  const screenWidth = getSystemInfoSync().screenWidth
  // @ts-ignore
  return pxTransform(px) || screenWidth / (designWidth / Number.parseInt(px))
}
