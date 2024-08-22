// 获取变量的类型
const typeOf = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
