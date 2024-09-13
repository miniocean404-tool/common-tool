// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance

class Person {
  name

  elements = []
  emoji = {
    red: "🔴",
    green: "🟢",
    blue: "🔵",
  }

  static search = {
    red: "🔴",
  }

  constructor({ name }) {
    this.name = name
  }

  add(element) {
    this.elements.push(element)
    return this
  }

  // 修改 instanceof 行为
  static [Symbol.hasInstance](instance) {
    const person = ["Alice", "Bob", "Charlie"]

    // return instance instanceof Person; // 会导致无限递归！
    return instance.constructor === this || person.includes(instance)
  }

  // 修改 for of 行为
  *[Symbol.iterator]() {
    for (const value of this.elements) {
      yield this.emoji[value] ?? value
    }
  }

  // 修改 toString 行为
  // 内置通用（well-known）symbol 是一个字符串值属性，用于创建对象的默认字符串描述。它由 Object.prototype.toString() 方法内部访问
  // output: "[object Person]"
  get [Symbol.toStringTag]() {
    return "Person"
  }

  // 修改类型转换行为, 指定了一种接受首选类型并返回对象原始值的表示的方法。它被所有的强类型转换制算法优先调用
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return 100
    if (hint === "string") return this.name
    if (hint === "default") return "default"
  }

  [Symbol.split](string) {
    return string.split("").join("--")
  }

  [Symbol.search](where) {
    const s = this.constructor.search[where]
    if (!s) return -1
    return 0
  }
}

const person = new Person({ name: "Alice" })

// Symbol.hasInstance
console.log("Alice" instanceof Person) // true

// Symbol.iterator
person.add("red").add("green").add("blue")
for (const element of person) {
  console.log(element)
}

// Symbol.toPrimitive
console.log(+person)
console.log(String(person))
console.log("a " + person)

// Symbol.split
console.log("abc".split(person))

// Symbol.toStringTag
console.log(Object.prototype.toString.call(person))

// Symbol.search
console.log("red".search(person))
