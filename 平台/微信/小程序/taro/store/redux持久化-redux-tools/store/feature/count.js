// counterSlice.ts 文件

import { createSlice } from '@reduxjs/toolkit'

// 创建一个 Slice 切片
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    title: 'redux toolkit pre',
  },
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 定义一个加的方法
    increment: (state, payload) => {
      state.value -= 1
    },
    // 定义一个减的方法
    decrement: (state) => {
      state.value -= 1
    },
  },
})
// 导出加减的方法
export const { increment, decrement } = counterSlice.actions

// 默认导出
export default counterSlice.reducer
