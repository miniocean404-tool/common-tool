import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
// https://juejin.cn/post/7371423114381443072?share_token=f7f3234a-d21c-43f1-b979-56e12239cf80

type Store = {
  token: string
  setToken: (token: string) => void
  removeToken: () => void
  getToken: () => string
  login: () => void
}

export const useTokenStore = create<Store>()(
  // Redux 开发者工具
  // set 第三个参数可用于在 redux 中显示行为 及 记录传递的参数
  devtools(
    persist(
      (set, get) => ({
        token: "",
        setToken: (token: string) =>
          set((state) => ({ token: state.token + token }), false, {
            type: "login/setToken",
            token,
          }),
        // 第二个参数代表是否覆盖整个对象, 包括方法
        removeToken: () => set({}, true),
        // 及时获取 set 后的值
        getToken: () => get().token,
        // 异步操作
        login: async () => {
          const response = await fetch("")
          set({ token: await response.json() })
        },
      }),
      {
        name: "login",
        // 默认使用 localStorage
        storage: createJSONStorage(() => sessionStorage),
        // 只持久化某个字段
        partialize(state) {
          const entries = Object.entries(state).filter(
            ([key]) => !["mouse"].includes(key), // 缓存排除mouse属性
          )

          // 将 entries map 转化为对象
          Object.fromEntries(entries)
        },
      },
    ),
  ),
)

// 外部获取非响应式状态
export const getLoginStore = () => useTokenStore.getState()
// useTokenStore.setState()

// 订阅状态变化 unbscribe 可以取消订阅
// const unbscribe = useTokenStore.subscribe((state, pre) => {
//   console.log("state change", state, pre)
// })
