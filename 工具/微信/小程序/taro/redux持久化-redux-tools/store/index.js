import { middleware } from '@/store/plugin/middleware'
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { persistConfig } from '@/store/plugin/persist'
import { reducers } from '@/store/feature'

// https://juejin.cn/post/7101688098781659172#heading-3
const persistedReducer = persistReducer(persistConfig, reducers)

// 设置 reducer 的初始状态值 （只能是 reducers 包含的）
const preloadedState = {
  counter: {},
}

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
  preloadedState,
})

export const persist = persistStore(store)
