const chinese = ["业务", "东", "吃", "长知识", "长驱直入", "重于泰山", "重蹈覆辙"]

// 针对多音字排序无法解决，只针对简单中文排序
chinese.sort((a, b) =>
  a.localeCompare(b, "zh-Hans-CN", {
    sensitivity: "accent",
    // 是否忽略标点符号
    ignorePunctuation: true,
  }),
)
