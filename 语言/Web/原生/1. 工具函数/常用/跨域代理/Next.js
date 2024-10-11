const next = require('next')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const dev = process.env.NODE_ENV !== 'development'

const devProxy = {
  '/api': {
    target: 'http://127.0.0.1:7001', // 端口自己配置合适的
    pathRewrite: {
      '^/api': '/',
    },
    changeOrigin: true,
  },
}

const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    if (dev && devProxy) {
      Object.keys(devProxy).forEach((context) =>
        server.use(createProxyMiddleware(context, devProxy[context]))
      )
    }

    server.all('*', (req, res) => {
      handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> 代理启动在 http://localhost:${port}`)
    })
  })
  .catch((err) => console.log('发生错误，无法启动服务器', '\r\n错误为:', err))
