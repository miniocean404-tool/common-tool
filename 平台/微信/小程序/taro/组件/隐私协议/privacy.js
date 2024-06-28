import { domDestroy, domRender } from "./render"
import React from "react"
import Privacy from "@/components/common/privacy"

export const renderPrivacy = (resolve) => {
  let node = null
  const onClose = () => domDestroy(node)

  const miniProgramName = ""

  node = domRender("__privacyPortal", () => (
    <Privacy
      onCancel={onClose}
      onOk={resolve}
      title={`[品牌名] ${miniProgramName} 隐私保护指引`}
      desc={`在使用「${miniProgramName}」小程序服务前，请仔细阅读%%webview:《[品牌名] ${miniProgramName} 隐私保护指引》:openPrivacyContract%%。如你同意《${miniProgramName} 隐私保护指引》，请点击【同意】开始使用「${miniProgramName}」小程序。`}
    />
  ))
}

// 在 hook 中使用
export const onReady = [
  () => {
    // 查看是否授权过
    // getPrivacySetting({
    //   success: (res) => console.log(res),
    //   fail: () => {},
    // })
    // onNeedPrivacyAuthorization((resolve, e) => {
    //   console.log('触发本次事件的接口是：' + e.referrer)
    //   renderPrivacy(resolve)
    // })
  },
]
