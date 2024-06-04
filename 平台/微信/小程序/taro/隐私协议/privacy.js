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
      title={`达芬骑 ${miniProgramName} 隐私保护指引`}
      desc={`在使用「${miniProgramName}」小程序服务前，请仔细阅读%%webview:《达芬骑 ${miniProgramName} 隐私保护指引》:openPrivacyContract%%。如你同意《${miniProgramName} 隐私保护指引》，请点击【同意】开始使用「${miniProgramName}」小程序。`}
    />
  ))
}
