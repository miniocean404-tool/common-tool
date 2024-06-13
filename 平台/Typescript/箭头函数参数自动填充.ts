// 箭头函数值自动填充
const demo = {
  name: "名字",
  age: 12,
}

const autoFill = <T extends object>(key: T, value: keyof T) => {}

autoFill(demo, "name")
