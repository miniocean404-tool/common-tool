// 1. 断言
const object1 = {
  name: "名字",
  age: 12,
} as const

const arr1 = ["1", "2"] as const

// 2. 断言
const object2 = <const>{
  name: "名字",
  age: 12,
}

const arr2 = <const>["1", "2"]

// Object.freeze 只能直接写 不能 传递值，否则不是 const 类型
const object3 = Object.freeze({
  name: "名字",
  age: 12,
})

const arr3 = Object.freeze(["1", "2"])

// Readonly 只能直接写 不能 传递值，否则不是 const 类型
type Object4 = Readonly<{
  name: "名字"
  age: 12
}>
type Arr4 = Readonly<["1", "2"]>
