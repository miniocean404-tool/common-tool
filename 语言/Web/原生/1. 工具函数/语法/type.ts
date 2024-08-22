// 获取变量的类型
const typeOf = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()

function typeOf2(obj: any) {
  const toString = Object.prototype.toString
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
    "[object FormData]": "formData",
    "[object Symbol]": "symbol",
    "[object BigInt]": "bigint",
  }
  return map[toString.call(obj)]
}
