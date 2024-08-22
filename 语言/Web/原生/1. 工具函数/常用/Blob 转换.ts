// Base64 转 Blob
export function base64ToBlob(base64, mimeType) {
  const reg = /data:(.*?);base64,/gims
  const iterator = [...base64.matchAll(reg)][0]
  const rep = base64.replace(iterator[0], "")

  let bytes = window.atob(rep)
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: iterator[1] })
}

// Blob 转 Base64
export function blobToBase64(blob: Blob): Promise<string | ArrayBuffer | null | undefined> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      resolve(e.target?.result)
    } // readAsDataURL
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error("base64转换错误"))
    }
  })
}

// ArrayBuffer ArrayBufferView 转 Blob
export function arraybufferToBlob(arraybuffer: ArrayBufferView | ArrayBuffer) {
  return new Blob([arraybuffer])
}
