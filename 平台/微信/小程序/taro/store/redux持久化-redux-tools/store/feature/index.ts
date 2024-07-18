import { combineReducers } from "redux";
import userInfoSlice from "@/store/feature/user-info";
import payInfoSlice from "@/store/feature/pay-info";
import loginInfoSlice from "@/store/feature/login";
import testDriveSlice from "@/store/feature/test-drive";

// 合并 reducer
export const reducers = combineReducers({
  userInfo: userInfoSlice,
  payInfo: payInfoSlice,
  loginInfo: loginInfoSlice,
  testDriveInfo: testDriveSlice,
});
