export const error = (_this, hook, method, err) => {
  console.error(`${_this} ${hook} 执行报错 ${method.name ? '函数名称 => ' + method.name : '函数体 => \n' + method.toString()} ${'报错信息 => \n' + err}`)
}
