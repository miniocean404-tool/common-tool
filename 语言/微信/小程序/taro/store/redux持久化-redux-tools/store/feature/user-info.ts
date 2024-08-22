// counterSlice.ts 文件

import type { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  avatar: "",
  nickName: "",
  webToken: "",
  refreshToken: "",

  mpToken: "",
  openId: "",
  code: "",
  isSavedLead: false,

  phone: "",
};

// 创建一个 Slice 切片
export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setStoreUserInfo(state, { payload }) {
      return { ...state, ...payload };
    },
    clearStoreUserInfo(state) {
      return initialState;
    },
    clearWebLogin(state) {
      return {
        ...state,
        avatar: "",
        nickName: "",
        webToken: "",
        refreshToken: "",
      };
    },
    clearMpLogin(state) {
      return {
        ...state,
        mpToken: "",
        openId: "",
        code: "",
        isSavedLead: false,
      };
    },
    clearAccount(state) {
      return {
        ...state,
        phone: "",
      };
    },
    setMpToken(state, { payload }) {
      state.mpToken = payload.token;
    },
  },
});

export const getStoreUserInfo = (state: RootState) => state.userInfo;

// 导出加减的方法
export const { setStoreUserInfo, clearStoreUserInfo, clearWebLogin, setMpToken } = userInfoSlice.actions;

// 默认导出
export default userInfoSlice.reducer;
