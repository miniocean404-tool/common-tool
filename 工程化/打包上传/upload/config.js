const path = require('path')

exports.dev = {
  ip: '', // ssh地址
  username: '', // ssh 用户名
  port: '', //端口
  password: '', // ssh 密码
  path: '/data/h5/admin/dist', // 操作开始文件夹 可以直接指向配置好的地址
  removePath: '/data/h5/admin/dist', // 需要删除的文件夹
  localPackage: path.resolve(__dirname, '../dist'),
}

exports.test = {
  ip: '', // ssh地址
  username: '', // ssh 用户名
  port: '', //端口
  password: '', // ssh 密码
  path: '/data/h5/admin/dist', // 操作开始文件夹 可以直接指向配置好的地址
  removePath: '/data/h5/admin/dist', // 需要删除的文件夹
  localPackage: path.resolve(__dirname, '../dist'),
}

exports.prd = {}
