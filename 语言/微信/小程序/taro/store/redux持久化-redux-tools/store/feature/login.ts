import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  messageId: "",
};

// 创建一个 Slice 切片
export const loginSlice = createSlice({
  name: "loginInfo",
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setStoreLoginInfo(state, { payload }) {
      return { ...state, ...payload };
    },
    resetLoginInfo() {
      return { messageId: "" };
    },
  },
});

// 导出加减的方法
export const { setStoreLoginInfo, resetLoginInfo } = loginSlice.actions;

// 默认导出
export default loginSlice.reducer;
