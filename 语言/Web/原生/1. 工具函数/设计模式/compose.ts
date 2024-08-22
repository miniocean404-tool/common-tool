// 通用compose函数
function compose() {
  const args = arguments
  const start = arguments.length - 1
  return function () {
    let i = start - 1
    let result = args[start].apply(this, arguments)
    while (i >= 0) {
      result = args[i].call(this, result)
      i--
    }
    return result
  }
}
