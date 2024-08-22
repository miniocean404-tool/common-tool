// 清除所有 cookie
const clearCookies = document.cookie
  .split(";")
  .forEach(
    (cookie) =>
      (document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)),
  )

// 是否为深色模式
const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

// 确定当前选项卡是否处于活动状态
const checkTabInView = () => !document.hidden

// 检查元素是否处于焦点
const isFocus = (ele: HTMLElement) => ele === document.activeElement

// 是否在视口中
function isExistViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}
