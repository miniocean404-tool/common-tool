import express from "express"
import type { Request, Response } from "express"
import { createProxyMiddleware } from "http-proxy-middleware"

let app = express()

const proxy = createProxyMiddleware<Request, Response>({
  // 代理跨域目标接口
  target: "",
  changeOrigin: true,
  on: {
    proxyReq(proxyReq, req, res) {
      // console.log(req.url,req.method)
      proxyReq.removeHeader("Origin")
    },
    // 修改响应头信息，实现跨域并允许带 cookie
    proxyRes: function (proxyRes, req, res) {
      // 当前端配置 withCredentials = true 时, 后端配置 Access-Control-Allow-Origin 不能为 *, 必须是相应地址
      // 当配置 withCredentials = true 时, 后端需配置 Access-Control-Allow-Credentials
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Access-Control-Allow-Headers", "*")
      res.setHeader("Access-Control-Allow-Methods", "*")
      res.setHeader("Access-Control-Max-Age", "3600")
      res.setHeader("Access-Control-Allow-Credentials", "true")
    },
    error(err, req, res, target) {
      console.log(err)
    },
  },

  // 修改响应信息中的 cookie 域名
  // cookieDomainRewrite: "localhost", // 可以为 false，表示不修改
})

app.use("/", proxy)

app.listen(4000)
