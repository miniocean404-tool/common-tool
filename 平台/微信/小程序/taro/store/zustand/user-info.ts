import { createWeAPPStorage } from "@/store/plugin/localstorge"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type State = {
  openId: string
  token: string
  email: string
  type: string
}

type Action = {
  setUserInfo: (info: State) => void
  removeUserInfo: () => void
  getUserInfo: () => State
}

export const useUserInfoStore = create<State & Action>()(
  persist(
    (set, get) => ({
      openId: "",
      token: "",
      email: "",
      type: "",
      setUserInfo: (info) => set((state) => ({ ...info }), false),
      removeUserInfo: () => set({}, true),
      getUserInfo: () => get(),
      // login: async () => {
      //   const response = await fetch("")
      //   set({ token: await response.json() })
      // },
    }),
    {
      name: "userInfo",
      storage: createJSONStorage(() => createWeAPPStorage),
    },
  ),
)
