// 获取设备线程数
console.log(navigator.hardwareConcurrency)

// 最多获取到 8
// console.log(navigator.deviceMemory)

// 获取网络下载速度 mbps
console.log(navigator.connection.downlink)

// 移动设备振动
console.log(navigator.vibrate([200, 100, 200]))
