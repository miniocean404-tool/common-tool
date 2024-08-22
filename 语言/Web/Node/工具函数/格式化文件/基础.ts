// @ts-ignore
import prettier from "prettier"

export async function format(text: string, type: string) {
  const config = require("../.prettierrc.js")
  return await prettier.format(text, { parser: type, ...config })
}
