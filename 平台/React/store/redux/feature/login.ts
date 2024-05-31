import { loginApi } from "@/api/login"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const initialState = {
  token: "",
}

export type LoginSlice = typeof initialState

// 创建一个异步的action
export const loginAction = createAsyncThunk<string, { username: string; password: string }>(
  "auth/login",
  async (params) => {
    const { username, password } = params
    const res = await loginApi({ phone: username, password, kolFlag: true })
    const token = res.data.data?.accessToken

    if (token) return token

    return ""
  },
)

// 创建一个 Slice 切片
export const loginSlice = createSlice({
  name: "login",
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setStoreLoginInfo(state, { payload }) {
      return { ...state, ...payload }
    },
    resetLoginInfo() {
      return { token: "" }
    },
  },
  extraReducers(builder) {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      action.payload && (state.token = action.payload)
    })
  },
})

// 导出加减的方法
export const { setStoreLoginInfo, resetLoginInfo } = loginSlice.actions

// 默认导出
export default loginSlice.reducer
