import ins from "../request";

import { InternalAxiosRequestConfig } from "axios";
import { addPendingRequest, removePendingRequest } from "../logic/repeat";
import { handleAuth } from "../logic/token";

// 请求拦截器
ins.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中

    // 处理 token
    handleAuth(config);
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
