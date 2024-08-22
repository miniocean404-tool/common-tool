function sum(a: number, b: number): number {
  return a + b
}

declare function debounce<T extends any>(fn: (...args: T[]) => any, delay: number): (...args: T[]) => void

const dSum = debounce(sum, 1000)

// 有 ...args: T[] 可以直接传递扩展
const a = dSum(...[1, 2])

// 没有 ...args: T[] 的情况，传递扩展
const params = [1, 2] as const
Math.atan2(...params)
