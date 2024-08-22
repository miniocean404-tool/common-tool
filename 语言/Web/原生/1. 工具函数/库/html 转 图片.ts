//! html-to-image 库更好用

// @ts-ignore
import domtoimage from "dom-to-image"

function downLoadPhoto() {
  const node = document.getElementById("table") //对应的html标签id
  domtoimage.toPng(node).then((dataUrl) => {
    const img = new Image()
    img.src = dataUrl
    // 将获取到的base64下载下来
    const imgUrl = img.src

    // @ts-ignore
    if (window.navigator.msSaveOrOpenBlob) {
      const bstr = atob(imgUrl.split(",")[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const blob = new Blob([u8arr])
      // @ts-ignore
      window.navigator.msSaveOrOpenBlob(blob, "chart-download" + "." + "png")
    } else {
      // 这里就按照chrome等新版浏览器来处理
      const a = document.createElement("a")
      a.href = imgUrl
      a.setAttribute("download", "chart-download")
      a.click()
    }
  })
}
