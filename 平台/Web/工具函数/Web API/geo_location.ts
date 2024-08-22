// 获取经纬度信息
function getGEOLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      //检测当前设备是否支持H5Geolocation API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var cords = position.coords
          // 经度
          const longitude = cords.longitude
          // 纬度
          const latitude = cords.latitude

          resolve({ longitude, latitude })
        },
        (error) => {
          var err = error.code
          switch (err) {
            case 1:
              reject("用户拒绝了位置服务")
              break
            case 2:
              reject("获取不到位置信息")
              break
            case 3:
              reject("获取信息超时")
          }
        },
      )

      //检测结果存在地理定位对象的话，navigator.geolocation调用将返回该对象
      //第一个参数获取当前地理信息成功是执行的回调函数，带3个参数，
      //第一个参数是必写的，表示获取当前地理位置信息成功时所执行的回调函数，该函数参数position也是必须。
      //第二个参数是获取地理位置信息失败的回调函数，该函数的参数error也是必写的，第三个参数是一些可选属性列表（2、3个参数可省略）
    } else {
      reject("该浏览器不支持获取地理位置")
    }
  })
}
