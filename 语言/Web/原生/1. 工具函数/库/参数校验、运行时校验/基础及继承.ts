// https://juejin.cn/post/7426923218952847412?searchId=202411011448290E5C6E27E6482D0C13E4
import { z } from "zod"
import { nanoid } from "nanoid/non-secure"

const phone = z.number()

export const schema = z.object({
  id: z
    .string({
      required_error: "ID 是必须的",
      invalid_type_error: "ID 必须是字符串",
      message: "必须是字符串",
      description: "描述",
    })
    // 校验是否是 nanoid
    .nanoid("必须是 nanoid")
    // 设置默认值
    .default(""),
  age: z
    .number({
      required_error: "age 必填",
      invalid_type_error: "age 必须是数字",
    })
    .min(0)
    .max(200),
  url: z.string().url().optional(),
  email: z
    .string()
    .email()
    // 可选
    .optional(),
  // 联合类型
  union: z.union([z.literal("private"), z.literal("public")]).optional(),
  enum: z.enum(["private", "public"]).optional(),
  // 插入继承
  phone,
  unknown: z.unknown(),
  unknownArr: z.array(z.unknown()).optional(),
})
// 自定义校验, 但是使用后不能使用 extend 方法继承
// .refine((data) => data.id !== "", { message: "ID 不能为空" });

const schema2 = schema.extend({})
const schema3 = schema.merge(z.object({ merge: z.string() }))

const transform = schema.transform((data) => ({
  ...data,
  transform: data.id.split(""),
}))

// 获取 schema 经过 transform 转换前的类型，如果设置 default 即是不使用 transform Input 类型为可选，infer 类型为必选
type ValidateInput = z.input<typeof schema>
type ValidateTransform = z.infer<typeof transform>
