// counterSlice.ts 文件

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  router: {
    help: "",
    highRegistration: false,
  },
};

export type TestDriveSlice = typeof initialState;

// 创建一个 Slice 切片
export const paySlice = createSlice({
  name: "testDriveInfo",
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setStoreRouterInfo(state, { payload }) {
      state.router = { ...state.router, ...payload };
      return state;
    },
  },
});

// 导出加减的方法
export const { setStoreRouterInfo } = paySlice.actions;

// 默认导出
export default paySlice.reducer;
