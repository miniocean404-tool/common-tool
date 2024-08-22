// 确定当前选项卡是否处于活动状态
const checkTabInView = () => !document.hidden

// 检查元素是否处于焦点
const isFocus = (ele: HTMLElement) => ele === document.activeElement

// 是否在视口中
function isExistViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}
