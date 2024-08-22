function getPlatform(ua: string) {
  const isWeChatBrowser = (ua.match(/MicroMessenger/i) && !ua.match(/miniprogram/i)) || false
  const isMiniProgram = ua.match(/miniprogram/i)

  return {
    isWeChatBrowser,
    isMiniProgram,
  }
}

const isAppleDevice = () => /Mac|iPod|iPhone|iPad/.test(navigator.platform)
