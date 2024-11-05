// Ai 回答一个字符一个字符展示的写法 可以是 SSE 方式(text/event-stream 是 SSE 的一个响应头类型)
const init = async () => {
  // 代表详情头刚好到达
  const res = await fetch("https://www.imooc.com/api/http/ai?name=imooc", {
    method: "POST",
    body: JSON.stringify({ name: "imooc" }),
  })

  // 代表第一个字节到达，但是还没有到达详情头，使用 ReadableStream 读取
  const reader = res.body?.getReader()

  while (true) {
    const textDecoder = new TextDecoder()
    const { done, value } = await reader?.read()!
    if (done) break

    const txt = textDecoder.decode(value)
    console.log(txt)
  }
}
