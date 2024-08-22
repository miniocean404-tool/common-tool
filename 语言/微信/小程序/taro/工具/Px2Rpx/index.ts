import { getSystemInfoSync, pxTransform } from "@tarojs/taro"

const designWidth = 375

// 将设计稿 px 转换为当前设备等比 px
export function px2devicePx(px: string | number) {
  const screenWidth = getSystemInfoSync().screenWidth
  // @ts-ignore
  return pxTransform(px) || screenWidth / (designWidth / Number.parseInt(px))
}

// !未知：获取根据设计稿尺寸 在不同设备真实的 px 值 （375 下 20px 在 320 下为 17px）
export function getWxDevicesSize({ size, deviceWidth = 375, wxRuleHeight = 750 }) {
  const { windowWidth } = getSystemInfoSync()
  const originRatio = wxRuleHeight / deviceWidth
  const nowRatio = wxRuleHeight / windowWidth

  const realSize = (size * originRatio) / nowRatio

  return Math.round(realSize)
}
