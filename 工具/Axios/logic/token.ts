import { InternalAxiosRequestConfig } from "axios";
import ins from "../request";
import { AxiosResponse } from "axios";

// 处理请求 token
export const handleAuth = (config: InternalAxiosRequestConfig) => {
  config.headers["token"] = localStorage.getItem("token") || "";
  return config;
};

// 处理响应的 token 无感刷新
export const handleToken = async (res: AxiosResponse) => {
  const token = res.headers.Authorization;
  const rtoken = res.headers.refreshToken;
  const isRToken = !!res.headers.__isRefreshToken;

  if (token) {
    ins.defaults.headers.common.Authorization = token;
    localStorage.setItem("token", token);
  }

  if (rtoken) {
    localStorage.setItem("refresh_token", token);
  }

  if (res.data.code === 401 && !isRToken) {
    // 用 rtoken 刷新 token
    const isSuccess = await refreshTokenApi();

    if (isSuccess) {
      // 使用新的 token 重新请求
      res.headers.Authorization = localStorage.getItem("token");
      res = await ins.request(res.config);
      return res;
    } else {
      console.log("跳转界面");
    }
  }

  return res;
};

let promise: Promise<boolean> | null = null;

export const refreshTokenApi = async () => {
  if (promise) return promise;

  promise = new Promise(async (reslove, reject) => {
    const res = await ins.get("/refresh_token", {
      headers: {
        Authorization: localStorage.getItem("refresh_token"),
        // 添加是否是 refreshToken 的请求
        __isRefreshToken: true,
      },
    });

    // 判断是否刷新成功
    reslove(res.data.code === 200);
  });

  promise.finally(() => {
    promise = null;
  });

  return promise;
};
