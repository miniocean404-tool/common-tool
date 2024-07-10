/**
 * 这个函数的目的是：将文件分片并逐片上传，同时记录上传进度以便于断点续传。
 * chunkSize：定义每个分片的大小，这里是10MB。
 * chunks：将文件分成多个分片。
 * chunkHashes：计算每个分片的哈希值，用于校验分片完整性。
 * uploadedChunks：从本地存储中读取已上传的分片索引，避免重复上传。
 * 遍历分片，检查当前分片是否已经上传，若已上传则跳过。
 * 创建 FormData 对象并添加分片数据、哈希值、索引和文件名，使用 fetch 将分片上传至服务器。
 * 若上传成功，将当前分片索引记录到 uploadedChunks 中并存储到本地存储。
 */
async function uploadFile(file, url) {
  const chunkSize = 10 * 1024 * 1024 // 10 MB
  const chunks = fileToChunks(file, chunkSize)
  const chunkHashes = await getChunksHashes(chunks)
  const uploadedChunks = new Set(JSON.parse(localStorage.getItem(file.name) || ""))

  for (let i = 0; i < chunks.length; i++) {
    if (uploadedChunks.has(i)) {
      console.log(`Chunk ${i} 已经上传`)
      continue
    }

    const formData = new FormData()
    formData.append("chunk", chunks[i])
    formData.append("hash", chunkHashes[i])
    formData.append("index", i.toString())
    formData.append("filename", file.name)

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      uploadedChunks.add(i)
      localStorage.setItem(file.name, JSON.stringify([...uploadedChunks]))
    } else {
      throw new Error(`失败去上传 chunk ${i}`)
    }
  }

  console.log("上传成功")
}

/**
 * 这个函数的目的是：定义计算文件各个分片的哈希值，以确保上传过程中数据的完整性。
 * 创建 SparkMD5.ArrayBuffer 实例，用于生成 MD5 哈希。
 * 遍历分片，使用 FileReader 读取每个分片的内容并计算其哈希值。
 * 将每个分片的哈希值存储在 hashes 数组中
 */
async function getChunksHashes(chunks: any[]) {
  const spark = new SparkMD5.ArrayBuffer()
  const hashes = []

  for (const chunk of chunks) {
    const hash = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        spark.append(event.target?.result)
        resolve(spark.end())
      }
      reader.readAsArrayBuffer(chunk)
    })
    hashes.push(hash)
  }

  return hashes
}
