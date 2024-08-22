// 确定当前选项卡是否处于活动状态
const checkTabInView = () => !document.hidden

// 检查元素是否处于焦点
const isFocus = (ele: HTMLElement) => ele === document.activeElement

// 是否在视口中
function isExistViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}

// 是否在视口中 2
function checkEleIsScreen(dom) {
  const cb = (entry) => {
    if (entry.isIntersecting) {
      console.log("目标可被看见")
    }
  }

  const observer = new IntersectionObserver(cb, { threshold: 1.0 })
  observer.observe(dom)
}
