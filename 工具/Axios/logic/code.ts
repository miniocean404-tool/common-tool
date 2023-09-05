import { authErrMap, errMessage } from "./constant";

// 业务码
export const handleAuthError = (error: string) => {
  if (authErrMap.hasOwnProperty(error)) {
    console.error(authErrMap[error]);

    // 授权错误，登出账户
    // logout()
    return false;
  }

  return true;
};

// 处理业后端自定义的消息
export const handleGeneralError = (error: any, msg: string) => {
  if (error && error.error !== "0") {
    console.error(msg);
    return false;
  }

  return true;
};

// 网络错误码处理
export const handleNetworkError = (status: number) => {
  let msg = "未知错误";

  if (status) {
    msg = errMessage[status] || `其他连接错误 -- ${status}`;
  } else {
    msg = `无法连接到服务器！`;
  }
};
