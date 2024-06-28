import { stringify } from "qs"

export function qsRouteParams(params) {
  // encode: false 不让 qs 编码
  return stringify(params, { addQueryPrefix: true, encode: false })
}

/**
 * 获取事件渠道
 */
export function getEventChannel() {
  const pages = getCurrentPages()
  const current = pages.pop()
  // const current = pages[pages.length - 1];

  // 或者 getCurrentInstance().page.getOpenerEventChannel()
  return current.getOpenerEventChannel()
}
