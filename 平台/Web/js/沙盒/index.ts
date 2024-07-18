// NodeJs 需要添加
const window = global

function createSandboxCtxProxy() {
  return new Proxy(
    {},
    {
      get(target, key, _receiver) {
        // 优先从代理对象上取值
        if (Reflect.has(target, key)) {
          return Reflect.get(target, key)
        }

        // 如果找不到，就直接从 window 对象上取值
        const rawValue = Reflect.get(window, key)

        // 如果兜底的是一个函数，需要绑定 window 对象，比如 window.addEventListener
        if (typeof rawValue === "function") {
          const valueStr = rawValue.toString()
          if (!/^function\s+[A-Z]/.test(valueStr) && !/^class\s+/.test(valueStr)) {
            return rawValue.bind(window) // 所有 window 上非构造函数调用时候的 this 绑定 window 对象
          }
        }

        // 其他情况直接返回
        return rawValue
      },
      set(target, key, value, _receiver) {
        return Reflect.set(target, key, value)
      },
    },
  )
}

function sandbox(code: string) {
  const boxCtx = createSandboxCtxProxy()

  // with 语句的能力可以这样理解：在 js 运行时将指定代码段的执行上下文设置为指定的对象，从而调整该代码端的作用域链。 使用 with，我们可以这样改动并且测试沙箱代码：
  const boxFn = `
  (function boxFn(window) {
    with(window){ ${code} }
  })(boxCtx)`
  // 通过 eval 函数执行子应用代码
  eval(boxFn)
}

const execCode = '(function () { window.a = 2; window.b = "b"; window.console.log ("a,b", a, b) })()'
sandbox(execCode)
