// @ts-ignore
import { UAParser } from "ua-parser-js"

export const isAppleDevice = () => /Mac|iPod|iPhone|iPad/.test(navigator.platform)

// UA 确定设备是移动设备还是台式机/笔记本电脑
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mobile" : "Desktop"

// 获取当前尺寸的设备类型
export const getSizeDeviceType = () => {
  return {
    isMobile: matchMedia("screen and (max-width: 767px)").matches,
    isTablet: matchMedia("screen and  (max-width: 1023px) and (min-width: 768px)").matches,
    isDesktop: matchMedia("screen and (min-width: 1023.1px)").matches,
  }
}

export function getPlatform(ua: string) {
  const isWeChatBrowser = (ua.match(/MicroMessenger/i) && !ua.match(/miniprogram/i)) || false
  const isMiniProgram = ua.match(/miniprogram/i)

  return {
    isWeChatBrowser,
    isMiniProgram,
  }
}

const { device } = UAParser(navigator.userAgent)
export function isMobile() {
  return device.type === "mobile"
}
