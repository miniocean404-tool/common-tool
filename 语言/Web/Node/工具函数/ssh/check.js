const { NodeSSH } = require("node-ssh")

const ssh = new NodeSSH()

const remoteHost = "" // 远程机器的IP地址
const remoteUser = "" // SSH用户名
const remotePassword = "" // SSH密码
const remotePort = 6667 // SSH端口

async function checkGpuMemory() {
  try {
    await ssh.connect({
      host: remoteHost,
      port: remotePort,
      username: remoteUser,
      password: remotePassword,
    })
    console.log("SSH连接成功")

    // 执行nvidia-smi命令来检查显存总量和使用情况
    const result = await ssh.execCommand(
      "nvidia-smi --query-gpu=memory.total,memory.used,memory.free --format=csv,noheader,nounits",
    )
    if (result.stderr) {
      console.error("Error executing command:", result.stderr)
      return
    }

    const lines = result.stdout.split("\n").filter((line) => line.trim() !== "")
    const gpuInfo = lines.map((line) => {
      const [total, used, free] = line.split(",").map((value) => parseInt(value.trim()))
      return { total, used, free }
    })

    console.log("GPU显存信息:", gpuInfo)

    gpuInfo.forEach((gpu, index) => {
      console.log(`GPU ${index}: 总显存 ${gpu.total} MiB, 已使用 ${gpu.used} MiB, 空闲 ${gpu.free} MiB`)

      if (gpu.used <= 10) {
        showNotification(index, gpu.used, gpu.total, gpu.free)
      }
    })
  } catch (err) {
    console.error("SSH连接失败:", err)
  } finally {
    ssh.dispose()
  }
}

checkGpuMemory()

console.log(`GPU ${gpuIndex} 显存空闲`)
console.log(`GPU ${gpuIndex} 当前显存空闲情况: 总显存 ${total} MiB, 已使用 ${used} MiB, 空闲 ${free} MiB`)

console.log("显存监测脚本已启动，每分钟检查一次显存使用情况")
