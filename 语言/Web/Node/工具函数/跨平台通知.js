// 参考：https://github.com/RoccoC/webpack-build-notifier

const notifier = require("node-notifier")
const path = require("path")

const image = path.join(__dirname, "assets/image/logo/logo-square-transparent.png")

// 基本通知
notifier.notify(
  {
    title: "到点了",
    subtitle: "下班辣下班辣",
    message: "还不下班，都什么时候了",
    icon: image,
    contentImage: image,
    sound: true, // 可选：播放通知声音
    wait: true, // 可选：等待用户响应,用户点击通知时才消失
    timeout: 10, // 优先与 wait
    // closeLabel: "取消",
    // dropdownLabel: "aaaa",
    // actions: ["确定", "取消"],
    open: "http://wwww.baidu.com", // 也支持 file://
    reply: true,
  },
  (err, resp, metadata) => {
    if (err) {
      console.error(err)
    }

    // console.log("notify", resp, metadata)
  },
)

notifier.on("click", (notice, options, event) => {
  // console.log("click", notice, options, event)
})
