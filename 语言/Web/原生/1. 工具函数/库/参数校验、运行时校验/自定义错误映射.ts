import { z, ZodErrorMap } from "zod"

// 会拦截所有自定义中没有填写的错误消息
export const customErrorMap: ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "必须为字符串!" }
    }
  }
  if (issue.code === z.ZodIssueCode.custom) {
    return { message: `less-than-${(issue.params || {}).minimum}` }
  }
  return { message: ctx.defaultError }
}

z.setErrorMap(customErrorMap)
