import { z } from "zod"
import { nanoid } from "nanoid/non-secure"
import { schema } from "./"

// 或者 typeof schema._type
type ValidatePayload = z.infer<typeof schema>

const parseSchema = (props: ValidatePayload) => {
  const safe = schema.safeParse(props)

  if (!safe.success) {
    console.log(safe.error?.message)
  }

  return safe.data
}

const payload: ValidatePayload = {
  id: nanoid(),
  age: 123,
  phone: 123,
}

const result = parseSchema(payload)
console.log(JSON.stringify(result))
