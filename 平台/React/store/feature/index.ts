import { combineReducers } from "redux"

import loginInfoSlice from "@/store/feature/login"

// 合并 reducer
export const reducers = combineReducers({
  login: loginInfoSlice,
})
