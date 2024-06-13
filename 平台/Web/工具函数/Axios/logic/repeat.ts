import axios, { InternalAxiosRequestConfig } from "axios";
import Qs from "qs";

// 路由切换取消重复请求：https://juejin.cn/post/6844903905625653262
// 多个请求下的 loading：https://zhuanlan.zhihu.com/p/68341381?utm_id=0
// 取消重复请求
const pendingRequest = new Map();

// Map中没有就添加进去
export function addPendingRequest(config: InternalAxiosRequestConfig) {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}

// 删除重复请求
export function removePendingRequest(config: InternalAxiosRequestConfig) {
  const requestKey = generateReqKey(config);

  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    pendingRequest.delete(requestKey);
  }
}

// 生成取消重复请求Map中的key
function generateReqKey(config: InternalAxiosRequestConfig) {
  const { method, url, params, data } = config;
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join("&");
}
