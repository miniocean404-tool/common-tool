// import { URL } from "@tarojs/runtime"

/**
 * ### 使用方式：
 * ```
 * const url =  "http://www.baidu.com".query({ name: "张三" })`
 *        user:${({ name }) => sizeValue + "啊"},
 *        password:${'123456'},
 * `
 * ```
 * ### 参考网址：https://juejin.cn/post/6905166914234875911?searchId=2024082223474169B6ADC89CD918AEA768
 *
 * @param：key_str：一个数组， 模板字符串中刨除 ${'xxx'} 之外的字符串 例如：[ '\n  user:', ',\n  password:', ',\n' ]
 * @param：exprs: 模板字符串表达式数组 ${'xxx'} 的值组成的数组
 *
 */
// @ts-ignore
String.prototype.query = function (props: any) {
  this.props = props

  return (template: string[], ...exprs: (string | number | Function)[]) => {
    const res = exprs.reduce<string>((memo, exp, index) => {
      const val = typeof exp === "function" ? exp(this.props) : exp
      return memo + val + template[index + 1]
    }, template[0])

    const url = new URL(this)

    const regexp = /(?<key>\S*):(?<value>.*),/gm

    let match
    while ((match = regexp.exec(res))) {
      const { key, value } = match.groups
      url.searchParams.set(key.trim(), value.trim())
    }

    return url.href
  }
}
