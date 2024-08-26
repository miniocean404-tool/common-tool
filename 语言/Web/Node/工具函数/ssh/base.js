const { NodeSSH } = require("node-ssh")
const ssh = new NodeSSH()

// 文章：https://juejin.cn/post/7406138889642426402?share_token=dcf5ea1f-5b8f-4f8c-bb33-9e59c2b24bb1
// 它最常用的 SSH 命令主要有以下这些：
// ssh username@hostname：远程登录到指定的主机。
// scp file.txt username@hostname:/remote/directory/：将文件复制到远程服务器。
// ssh -L 8080:localhost:80 username@hostname：将本地的 8080 端口转发到远程主机的 80 端口。

ssh
  .connect({
    host: "127.0.0.1",
    username: "moment",
    password: "moment",
  })
  .then(() => {
    // 执行远程命令
    ssh.execCommand("uptime").then((result) => {
      console.log("STDOUT: " + result.stdout)
      console.log("STDERR: " + result.stderr)
    })

    // 上传文件
    ssh
      .putFile("local-path.txt", "/remote-path.txt")
      .then(() => {
        console.log("文件上传成功")
      })
      .catch((err) => {
        console.error("文件上传失败:", err)
      })

    // 下载文件
    ssh
      .getFile("local-path.txt", "/remote-path.txt")
      .then(() => {
        console.log("文件下载成功")
      })
      .catch((err) => {
        console.error("文件下载失败:", err)
      })
  })
  .catch((err) => {
    console.error("SSH连接失败:", err)
  })
