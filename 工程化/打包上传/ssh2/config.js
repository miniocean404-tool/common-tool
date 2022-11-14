const path = require('path')

const zipName = (() => `h5_toA.zip`)()

exports.zipName = zipName

exports.prd = {
  ip: '', // ssh地址
  username: '', // ssh 用户名
  port: '', // 端口
  password: '', // ssh 密码
  netPath: '/app/production_file', // 操作开始文件夹 可以直接指向配置好的地址
  // removePath: '/data/h5/admin/dist', // 需要删除的远程目录
  compressPath: path.join(__dirname, zipName), // 压缩包地址
  buildPath: path.join(__dirname, '../dist/build/h5/.'), // 打包地址
}
