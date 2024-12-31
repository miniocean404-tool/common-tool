// 文章：https://juejin.cn/post/7433243522555936779?share_token=b5a9a4d0-4623-4626-b584-b44c09dfe7d9
// 官网：https://imagekit.io/

import ImageKit from "imagekit"
import crypto from "crypto"

const imageKit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
})

// 服务端传递

export async function uploadImageKit(file: Buffer, fileName: string) {
  const hash = generateFileHash(file)

  // 检查文件是否已存在
  const existingFile = await checkIfFileExists(hash)
  if (existingFile) return existingFile // 返回已上传文件的URL

  // 上传文件
  try {
    const response = await imageKit.upload({
      file, // 上传的文件内容
      fileName, // 文件名
      tags: [hash], // 将哈希值作为标签存储，便于后续查找
    })
    return response
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`图片上传失败: ${error.message}`)
    }
  }
}

function generateFileHash(file: Buffer): string {
  return crypto.createHash("md5").update(file).digest("hex")
}

async function checkIfFileExists(fileHash: string) {
  // 使用 ImageKit 的列表文件 API，根据文件哈希标签查找
  return await imageKit.getFileDetails(fileHash)
}

// 客户端 UI 直接传递需要的签名
export function generateUploadSignature(privateKey: string) {
  const expire = Math.floor(Date.now() / 1000) + 30 * 60 // 30 分钟后过期
  const token = crypto.randomBytes(16).toString("hex")

  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex")

  return { signature, expire, token }
}

// 获取文件列表
// const files = await imageKit.listFiles({
//   tags: fileHash,
//   limit: 1, // 只需要一个文件
// })

// return files.length > 0 ? files[0] : null
