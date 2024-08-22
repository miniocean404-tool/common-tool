// @ts-ignore
import axios from "axios"
import fs from "fs"

async function upload(url: string, filePath: string, appName: string) {
  const file = fs.createReadStream(filePath)
  // const file = Buffer.from(fs.readFileSync(filePath))

  // from 表单上传 文件必须放在 ... 结构下面
  // Buffer.from 和 fs.createReadStream 都可以上传
  const form = axios.toFormData({
    // @ts-ignore
    ...token.params,
    "x-cos-meta-file-name": appName,
    file: file,
  })

  const upRes = await axios.postForm(url, form)
}
