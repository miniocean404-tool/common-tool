// 反转字符串
const reverseStr = (str: string) => str.split("").reverse().join("")

// 指定长度的随机字符串
const generateRandomString = (length: number) => [...Array(length)].map(() => Math.random().toString(36)[2]).join("")

// 首字母大写
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
