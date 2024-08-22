const conditions = [undefined, null, 1, 2]

const condition = 1

// 这段代码的分享是为了展示如何使用 Array.prototype.includes() 方法来检查条件变量是否包含在一个数组中，并且在条件满足时执行某个操作。
// 它展示了一种简洁而高效的方法来进行多值匹配，这在许多编程场景中都非常实用。
// 以后不要再使用像 if(a === undefined || a === null || a === 1 || a === 2) 这种多值匹配写法了！
if (conditions.includes(condition)) {
  doSomething()
}

function doSomething() {}
