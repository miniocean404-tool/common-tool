import axios from "axios";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import http from "http";
import https from "https";
import Qs from "qs";

export const UserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36";
export const ContentType = "application/x-www-form-urlencoded";
const http = window.require("axios/lib/adapters/http.js");

const ins = axios.create({
  baseURL: "",
  timeout: 5000,
  withCredentials: true,
  responseType: "json", //文档设置为document自动转化为DOM、text为文字、blob等
  // xsrf 设置
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  // 最多转发数，用于node.js
  maxRedirects: 5,
  // 最大响应数据大小
  maxContentLength: 200000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },

  // 查询对象序列化函数
  paramsSerializer: function (params: any) {
    return Qs.stringify(params, { arrayFormat: "brackets" });
  },

  // 请求后的数据处理 (responseType 的处理),一般不用这个函数，响应解析失败可注释
  transformResponse: [
    function (res: AxiosResponse) {
      return JSON.parse(res.data);
    },
  ],

  // 自定义错误状态码范围
  validateStatus: function (status: number) {
    return status >= 200 && status < 400;
  },

  // xhr请求中用于node.js
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // adapter: http

  // proxy: {
  // 	host: '127.0.0.1',
  // 	port: 9000
  // }
});

export default ins;
