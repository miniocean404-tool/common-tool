// notify(
//   {
//     title: "中奖提示",
//     icon: "http://img.doutula.com/production/uploads/image/2021/12/27/20211227577371_BfhXeN.jpg",
//     body: "恭喜你，掘金签到一等奖",
//     tag: "prize",
//   },
//   {
//     onclick(ev) {
//       console.log(ev)
//       ev.target.close()
//       window.focus()
//     },
//   },
// )
// 带图带事件的桌面通知
function notify(o = {}, evs = {}) {
  if (!("Notification" in window)) return console.error("浏览器不支持桌面通知")

  if (Notification.permission === "granted") {
    doNotify(o, evs)
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") doNotify(o, evs)
    })
  }
}

function doNotify(o, evs) {
  const notification = new Notification(o.title, o)
  for (let e in evs) {
    notification[e] = evs[e]
  }
}
