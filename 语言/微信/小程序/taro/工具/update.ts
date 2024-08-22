import { getUpdateManager, showModal, getAccountInfoSync } from "@tarojs/taro"

export const updateVersion = () => {
  // 可以获取小程序版本
  // const info = getAccountInfoSync()
  // console.log(info.miniProgram)

  const updateManager = getUpdateManager()
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    // const { hasUpdate, version } = res
  })
  updateManager.onUpdateReady(async () => {
    await showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      },
    })
  })
  updateManager.onUpdateFailed((err) => {
    console.log(err)
    // 新的版本下载失败
  })
}
