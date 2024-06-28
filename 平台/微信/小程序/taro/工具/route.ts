import { stringify } from "qs"

export function qsRouteParams(params) {
  // encode: false 不让 qs 编码
  return stringify(params, { addQueryPrefix: true, encode: false })
}
