// 输出 0 则是
;[..."(())()(()())"].reduce((a, i) => (i === "(" ? a + 1 : a - 1), 0)
