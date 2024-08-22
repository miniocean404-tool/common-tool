// 箭头函数值自动填充
const demo = {
  name: "名字",
  age: 12,
} as const

const autoFill = <T extends object>(key: keyof T, value: T[keyof T]) => {}

autoFill<typeof demo>("name", "名字")
