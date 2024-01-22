import ins from "../request";
import axios, { AxiosResponse } from "axios";

import { removePendingRequest } from "../logic/repeat";
import { handleToken } from "../logic/token";
import { handleAuthError, handleGeneralError, handleNetworkError } from "../logic/code";

// 响应拦截器,响应拦截器中添加响应错误状态码、数据的判断
ins.interceptors.response.use(
  async (res: AxiosResponse) => {
    if (res?.status !== 200) return Promise.reject(res.data);

    // 处理 token 无感刷新
    res = await handleToken(res);

    // 从pendingRequest对象中移除请求
    removePendingRequest(res.config);

    // 处理业务
    handleAuthError(res.data.error);
    // 处理生成的错误
    handleGeneralError(res.data.error, res.data.msg);

    return res;
  },

  (err: any) => {
    removePendingRequest(err.config || {}); // 从pendingRequest对象中移除请求

    if (axios.isCancel(err)) {
      console.log("已取消的重复请求：" + err.message);
      return Promise.resolve({});
    }

    // 处理 http 状态码
    handleNetworkError(err.response?.status);

    //根据上面的自定义状态码抛出错误
    return Promise.reject(err);
  },
);
