import { createAlova } from "alova"
import AdapterTaro from "@alova/adapter-taro"
import { useUserInfoStore } from "@/store/user-info"
import { getStorageSync, getCurrentInstance, showToast, navigateTo } from "@tarojs/taro"

// const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication({})

const alovaInst = createAlova({
  // @ts-ignore
  baseURL: BASE_URL,
  timeout: 10000,
  beforeRequest: (method) => {
    method.config.headers["wmp-token"] = getStorageSync("token") || useUserInfoStore.getState().token
  },
  responded: {
    onSuccess: async (response, method) => {
      return new Promise(async (resolve, reject) => {
        const resp = response as Taro.request.SuccessCallbackResult<any>
        const code = resp?.data?.code

        const routerPath = getCurrentInstance().router?.path

        if (code === 10004) {
          showToast({
            title: msg,
            icon: "none",
            duration: 3000,
          })
          setTimeout(async () => {
            await navigateTo({
              url: "/pages/login/index",
            })
          }, 1000)
        }

        if (code === 400 && routerPath !== "/pages/login/index") {
          await showToast({
            title: "网络繁忙",
            icon: "none",
            duration: 2000,
          })
        }

        if (resp.statusCode === 200 && code === 200) {
          resolve(resp)
        } else {
          reject(resp)
        }
      })
    },
    // 连接超时或连接中断时才会触发 onError 拦截器
    onError: async (error, method) => {
      await showToast({
        title: "网络错误",
        icon: "none",
        duration: 2000,
      })

      console.log("网络超时", error.message)
    },
    onComplete: () => {},
  },
  ...AdapterTaro(),
})

export default alovaInst
