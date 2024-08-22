// 打乱数组: 这在彩票程序中很常见，但并不是真正随机的。
export const shuffleArray = (array: number[]) => array.sort(() => Math.random() - 0.5)

// 获取一组数的平均值
export const average = (...args: number[]) => args.reduce((a, b) => a + b, 0) / args.length

// 简单去重
export const uniqueArray = (...arr: number[]) => [...new Set(arr)]

// 数组去重
export function unique<T extends { [key: string]: any }>(arr: T[]) {
  function equals(value1: T, value2: T) {
    if (value1 instanceof Object && value2 instanceof Object) {
      const keys1 = Object.keys(value1)
      const keys2 = Object.keys(value2)
      if (keys1.length !== keys2.length) return false

      for (const k of keys1) {
        if (!keys2.includes(k)) return false
        if (!equals(value1[k], value2[k])) return false
      }

      return true
    } else {
      return value1 === value2
    }
  }

  const newArr = [...arr]

  for (let i = 0; i < newArr.length; i++) {
    for (let j = i + 1; j < newArr.length; j++) {
      if (equals(newArr[i], newArr[j])) {
        newArr.splice(j, 1)
        j--
      }
    }
  }
}
