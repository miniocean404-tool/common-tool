const { stat } = require('fs/promises')

// 格式化文件尺寸
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

async function packageSize(fileName) {
  const stats = await stat(fileName || '')
  console.log(`ESBuild 打包尺寸: ${formatFileSize(stats.size)}\n\n`)
}

module.exports = {
  packageSize,
}
