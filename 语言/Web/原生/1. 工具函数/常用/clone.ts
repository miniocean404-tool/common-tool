/**
 * 原生深度克隆
 *
 * @param 参数 1：value 要克隆的值
 * @param 参数 2：transfer 是一个可转移对象的数组，里面的 值 并没有被克隆，而是被转移到被拷贝对象上。
 * @returns 返回值是原始值的深拷贝。
 */
const clone = structuredClone({ xx: "xx" })

// 解决循环嵌套 的 深度克隆
const deep_clone = (object) => {
  return new Promise((resolve, reject) => {
    const { port1, port2 } = new MessageChannel()
    port1.postMessage(object)
    port2.onmessage = (msg) => {
      const clone = msg.data
      resolve(clone)
    }
  })
}

// 深度克隆
function deepClone(awaitCloneObj, hash = new WeakMap()) {
  // 函数克隆
  function fnClone(fn) {
    // 获取参数正则
    let paramReg = /\((.*?)\)/
    // 获取函数体正则
    let bodyReg = /\{(.*)\}/g
    let fnStr = fn.toString()

    if (fn.prototype || fn.__proto__) {
      let params = paramReg.exec(fnStr)
      let body = bodyReg.exec(fnStr)

      // @ts-ignore
      if (body && params[1]) {
        // @ts-ignore
        let arrParam = params[1].split(",")
        return new Function(...arrParam, body[1])
      } else if (body) {
        return new Function(body[1])
      }
    } else {
      return eval(fnStr)
    }
  }

  const type = [Date, RegExp, Set, Map]
  let root = {}
  const loop = [
    {
      parent: root, // 父对象
      key: undefined, // 被克隆对象中的键
      value: awaitCloneObj, // 被克隆对象中的值
    },
  ]

  while (loop.length) {
    // @ts-ignore
    const { parent, value, key } = loop.pop()

    // 设置克隆对象
    let propValue
    if (!key) propValue = root
    if (key) propValue = parent[key] = {} // root对象中被克隆对象键对应的值

    if (hash.has(value)) {
      parent[key] = hash.get(value)
      continue
    }

    if (type.includes(value.constructor)) {
      if (key) {
        parent[key] = new value.constructor(value)
        continue
      } else {
        root = new value.constructor(value)
        continue
      }
    }

    if (!type.includes(value.constructor) && typeof value === "object") {
      const allDesc = Object.getOwnPropertyDescriptors(value) // 获取值的描述并设置属性
      Object.defineProperties(propValue, allDesc)
      propValue.__proto__ = Object.getPrototypeOf(value) // 设置继承与原对象一样的原型

      // 设置循环引用 key源对象 value 克隆对象
      hash.set(value, propValue)

      for (const key of Reflect.ownKeys(value)) {
        // 如果是对象就递归克隆
        if (value[key] !== null && typeof value[key] === "object") {
          loop.push({
            parent: propValue,
            // @ts-ignore
            key,
            value: value[key],
          })
        }
        // 如果是函数就克隆函数
        else if (typeof value[key] === "function") {
          propValue[key] = fnClone(value[key]) // 克隆函数
        }
        // 都不是就指向引用
        else {
          propValue[key] = value[key] // 指向引用
        }
      }
    }
  }

  return root
}
