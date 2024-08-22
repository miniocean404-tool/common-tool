// 复制
const copyToClipboard = (content: string | number) => navigator.clipboard.writeText(content.toString())

function copyPersonURL(content: string | number) {
  // @ts-ignore
  if (window.ClipboardData) {
    // @ts-ignore
    window.clipboardData.setData("text", content)
  } else {
    ;(function (content) {
      document.oncopy = function (e) {
        // @ts-ignore
        e.clipboardData.setData("text", content)
        e.preventDefault()
        document.oncopy = null
      }
    })(content)
    document.execCommand("Copy")
  }
}

// 禁止右键、选择、复制
;["contextmenu", "selectstart", "copy"].forEach(function (ev) {
  document.addEventListener(ev, function (event) {
    return (event.returnValue = false)
  })
})

// 获取鼠标选择内容
const getSelectedText = () => window.getSelection()?.toString()
