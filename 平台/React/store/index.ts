import { middleware } from "@/store/plugin/middleware"
import { persistReducer, persistStore } from "redux-persist"
import { configureStore } from "@reduxjs/toolkit"
import { persistConfig } from "@/store/plugin/persist"
import { reducers } from "@/store/feature"
import { useDispatch, useSelector, useStore } from "react-redux"

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppRootState>()
export const useAppStore = useStore.withTypes<typeof store>()

// 函数式组件使用：https://juejin.cn/post/7101688098781659172#heading-3
// 类组件使用：https://github.com/icesman/issues/issues/1
const persistedReducer = persistReducer(persistConfig, reducers)

// 设置 reducer 的初始状态值 （只能是 reducers 包含的）
const preloadedState = {}

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE !== "production",
  middleware,
  preloadedState,
})

export const persist = persistStore(store)

// Demo
// const auth = useSelector<AppRootState, LoginSlice | undefined>((state) => state.login)
//   const auth = useSelector((state: AppRootState) => state.login)
