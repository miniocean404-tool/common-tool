import { onNeedPrivacyAuthorization } from '@tarojs/taro'
import { renderPrivacy } from '@/utils/global/privacy'

export const onReady = [
  () => {
    onNeedPrivacyAuthorization((resolve, e) => {
      console.log('触发本次事件的接口是：' + e.referrer)
      renderPrivacy()
    })
  },
]
