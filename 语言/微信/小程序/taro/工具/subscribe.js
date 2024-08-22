import {requestSubscribeMessage} from '@tarojs/taro'

// 订阅微信通知
export const subscribeMessage = (templateId, complete) => {
  requestSubscribeMessage({
    //模板ID
    tmplIds: [templateId],
    complete,
    success: (res) => {
      console.log(res)
    },
    fail(err) {
      console.log(err, templateId)
    },
  })
}
