// 下载
export const downloadUrl = (url: string, filename: string) => {
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
}

// 通过后端响应头 disposition 下载文件
function downloadFile(blob, { name = "默认文件名", disposition, suffix = "zip", mime }) {
  // disposition 是 content-disposition: attachment;filename*=utf-8''%E9%94%99%E8%AF%AF%E6%95%B0%E6%8D%AE.xls
  if (disposition) {
    let name1 = disposition.match(/filename=(.*);/)[1] // 获取filename的值
    let name2 = disposition.match(/filename\*=(.*)/)[1] // 获取filename*的值

    name1 = decodeURIComponent(name1)
    name2 = decodeURIComponent(name2.substring(6)) // 这个下标6就是UTF-8''

    if (name1 || name2) name = name1 || name2
  }

  if (!blob.type && mime) blob = new Blob([blob], { type: mime })
  const href = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.download = `${name}.${suffix}`
  a.href = href
  a.click()

  URL.revokeObjectURL(href)
}

// 格式化文件尺寸
function formartFileSize(bytes: number) {
  if (bytes === 0) return "0 B"

  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

interface FileTreeStruct {
  handle: FileSystemDirectoryHandle | FileSystemFileHandle
  path?: string
  dir?: string
  children?: FileTreeStruct[]
}

// 文章：https://juejin.cn/post/7287131174266830905?searchId=202401131930441D7C2E83217CEDCF2127#heading-1
// 获取目录结构
export async function pickDirs(): Promise<{ tree: FileTreeStruct | undefined; files: FileTreeStruct[] }> {
  // @ts-ignore
  const dir = await showDirectoryPicker({ mode: "read" })
  const files: FileTreeStruct[] = []

  const processHandle = async (handle: FileSystemDirectoryHandle | FileSystemFileHandle, parentPath: string = ".") => {
    if (handle.kind === "directory") {
      const handle_tree: FileTreeStruct = {
        handle,
        dir: parentPath + "/" + handle.name,
        children: [],
      }

      const iter = handle.entries()

      for await (const entry of iter) {
        const [name, sub_handle] = entry
        // @ts-ignore
        const handle_sub_tree: FileTreeStruct = { handle: sub_handle }

        if (sub_handle.kind === "file") {
          handle_sub_tree.path = handle_tree.dir + "/" + name
          handle_tree.children && handle_tree.children.push(handle_sub_tree)

          files.push(handle_sub_tree)
        }

        if (sub_handle.kind === "directory") {
          // @ts-ignore
          const children = await processHandle(sub_handle, handle_tree.dir)
          children && handle_tree.children?.push(children)
        }
      }

      return handle_tree
    }
  }

  const tree = await processHandle(dir)

  return {
    tree,
    files,
  }
}
