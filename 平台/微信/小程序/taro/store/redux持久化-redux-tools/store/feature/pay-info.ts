// counterSlice.ts 文件

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  state: 0b0,
};

export type PayInfoSlice = typeof initialState;

// 创建一个 Slice 切片
export const paySlice = createSlice({
  name: "payInfo",
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setStorePayInfo(state, { payload }) {
      const clear = state.state & 0b0;

      const final = clear | payload.state;
      return { state: final };
    },
    resetPayInfo() {
      return { state: 0b0 };
    },
  },
});

// 导出加减的方法
export const { setStorePayInfo, resetPayInfo } = paySlice.actions;

// 默认导出
export default paySlice.reducer;
