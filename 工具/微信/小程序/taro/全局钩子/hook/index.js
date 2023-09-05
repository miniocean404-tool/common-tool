// https://juejin.cn/post/7241057290777346104
import { appHooks } from './app'
import { pageHooks } from './page'

/**
 * @description: 统一修改小程序的生命周期钩子, 在对应的生命周期运行添加的方法
 * @param {string} type 添加入App还是Page的生命周期
 * @param hook 需要增加的生命周期
 * @param method 需要增加的方法
 * @return {*}
 */
export default function addLifecycleHook(type, hook, method) {
  switch (type) {
    case 'apphooks':
      appHooks[hook].push(method)
      break
    case 'pageHooks':
      pageHooks[hook].push(method)
      break
    default:
      console.error('无效 type => ', type)
  }
}
