// https://juejin.cn/post/7360700937966174262?share_token=fd2b816c-6ee5-4256-b2e8-e496bef1dbc5
import { z, ZodError } from "zod"
import { createMessageBuilder, fromError } from "zod-validation-error"

const scheme = z.object({
  id: z.number({ message: "期望是数字" }).int({ message: "期待 id" }).positive(),
  email: z.string().email("期待 email"),
})

const messageBuilder = createMessageBuilder({
  // 最大错误提示数
  maxIssuesInMessage: 1,
  // 错误提示前缀
  prefix: null,
  // 用于控制是否包含错误的属性名称后缀 例如: `id: 1`
  includePath: false,
})

const init = () => {
  try {
    scheme.parse({
      id: 1.1,
      email: "foobar",
    })
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const validationError = fromError(err, { messageBuilder })
      console.log(validationError.toString())
      return validationError
    }
  }
}

init()
