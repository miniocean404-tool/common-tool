// 获取两个整数之间的随机整数
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

// 保留几位小数
const round = (n: number, d: number) => Number(Math.round(Number(n + "e" + d)) + "e-" + d)
