// 检测对象是否为空
// {} => true
// { name: 'fatfish' } => false
const isEmpty = (obj: {}) => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
