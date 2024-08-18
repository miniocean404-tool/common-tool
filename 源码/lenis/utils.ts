// 对两个值进行线性插值 (0 <= amt <= 1) 用于在两个给定的数值 start 和 end 之间进行线性插值。amt 是一个在 0 到 1 之间的值，表示插值的比例
export const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end

// 阻尼效果 x 和 y 分别是起始值和目标值，lambda 是阻尼系数，dt 是时间间隔。
export const damp = (x: number, y: number, lambda: number, dt: number) =>
  lerp(x, y, 1 - Math.exp(-lambda * dt))

// 获取一个中间值
export const clamp = (min: number, input: number, max: number) =>
  Math.max(min, Math.min(input, max))
