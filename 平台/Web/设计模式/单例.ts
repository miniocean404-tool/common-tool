// 1.
const getInstanceWrapper = (fn) => {
  let instance

  return function (...res) {
    if (!instance) instance = fn.apply(this, res)
    return instance
  }
}

// 传入任意函数得到一个可以获取这个函数 单例对象 的函数，使用 instance(params)
const instance = getInstanceWrapper(() => {})

// 2. ESM 默认导出其他地方导入也是单例
export default {}
