// 获取当前页面的滚动位置
const getScrollPosition = (el: any = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
})

// 平滑滚动到页面顶部
const scrollToTop = () => {
  const y = document.documentElement.scrollTop || document.body.scrollTop
  if (y > 0) {
    window.scrollTo({
      left: 0,
      top: y,
      behavior: "smooth",
    })
  }
}
