;(function flexible(window, document) {
  const docEl = document.documentElement
  // 设备像素比
  const dpr = window.devicePixelRatio || 1

  // 设置 body 的 font-size
  // 这里根据 dpr 设置 body 标签的字体大小，是为了设置默认继承的字体大小。
  // 否则默认的字体大小会非常大。
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    }
  }

  // 设置 documentElement 的 font-size
  function setRemUnit() {
    const rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  document.addEventListener('DOMContentLoaded', () => {
    setBodyFontSize()
    setRemUnit()
  })

  // 窗口大小改变或页面是从缓存中加载，就重新调用 setRemUnit
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      // 如果页面是从缓存中加载
      setRemUnit()
    }
  })

  // 检测当前设备是否支持 0.5px。如果支持，docEl 将会增加类名 hairlines
  if (dpr >= 2) {
    const fakeBody = document.createElement('body')
    const testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
})(window, document)
