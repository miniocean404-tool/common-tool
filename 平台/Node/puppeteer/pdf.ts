// https://juejin.cn/post/7000282509959233567
// "puppeteer": "22.14.0"

import puppeteer, { type Page } from "puppeteer"
import child_process from "node:child_process"

const web = ``
const targetDir = "./"

const generateAddress = [
  { name: "用户手册", url: "/book/user" },
  { name: "保修手册", url: "/book/fix" },
]

const user: User = {
  username: "",
  password: "",
}

;(async () => {
  const browser = await puppeteer.launch({ headless: "shell" })
  const page = await browser.newPage()
  await login({ page, user })

  for (const pdf of generateAddress) {
    await genPDF({ page, url: `${web}${pdf.url}`, name: pdf.name })
  }

  oepnDir(targetDir)
  await browser.close()
})()

interface LoginFn {
  page: Page
  user: User
}

interface User {
  username: string
  password: string
}

async function login({ page, user }: LoginFn) {
  await page.goto(`${web}/passport/signIn`, { waitUntil: "networkidle0" })

  const usernameInput = await page.$(
    "#__layout > div > div > div.container-sign-in > div.form > div:nth-child(1) > div.slot > div > div > div > input",
  )
  const passwordInput = await page.$(
    "#__layout > div > div > div.container-sign-in > div.form > div:nth-child(2) > div.slot > div > div > div > input[type=password]",
  )
  const agreeButton = await page.$(
    "#__layout > div > div > div.container-sign-in > div.form > div.davinci-checkbox-component > div.indicator",
  )
  const loginButton = await page.$(
    "#__layout > div > div > div.container-sign-in > div.form > div.button-container > button",
  )

  await usernameInput?.type(user.username)
  await passwordInput?.type(user.password)
  await agreeButton.click()
  await loginButton.click()

  await page.waitForNetworkIdle({ concurrency: 0 })
}

interface GeneratePDF {
  page: Page
  url: string
  name: string
}

async function genPDF({ page, url, name }: GeneratePDF) {
  await page.goto(url, { waitUntil: "networkidle2" })
  // 对于大的PDF生成，可能会时间很久，这里规定不会进行超时处理
  page.setDefaultNavigationTimeout(0)
  // 定义html内容
  // await page.setContent("", { waitUntil: "networkidle2" })
  // 等待字体加载响应
  await page.evaluateHandle("document.fonts.ready")

  // 页眉模板（图片使用base64，此处的src的base64为占位值）
  const headerTemplate = `<div
style="width: calc(100% - 28px); margin-top: -13px; font-size:8px;border-bottom:2px solid #e1dafb;padding:6px 14px;display: flex; justify-content: space-between; align-items:center;">
<span style="color: #9a7ff7; font-size: 12px; font-family: my-font;">李钟航的报告模板</span>
<img style="width: 80px; height: auto;" src="data:image/png;base64,iVBORw0KGgoAAAxxxxxx" />
</div>`
  // 页脚模板（pageNumber处会自动注入当前页码）
  const footerTemplate = `<div
style="width:calc(100% - 28px);margin-bottom: -20px; font-size:8px; padding:15px 14px;display: flex; justify-content: space-between; ">
<span style="color: #9a7ff7; font-size: 10px;">这里是页脚文字</span>
<span style="color: #9a7ff7; font-size: 13px;" class="pageNumber"></span>
</div>`

  await page.pdf({
    scale: 1,
    path: `${targetDir}${name}.pdf`,
    format: "a4",
    displayHeaderFooter: true,
    headerTemplate,
    // 页脚的模板
    footerTemplate,
    margin: {
      top: "70px",
      bottom: "70px",
      left: "70px",
      right: "70px",
    },
    // 给页面优先级声明的任何CSS @page 大小超过 width 和 height 或 format 选项中声明的大小。 默认为 false，它将缩放内容以适合纸张大小。
    preferCSSPageSize: true,
    // 开启渲染背景色，因为 puppeteer 是基于 chrome 浏览器的，浏览器为了打印节省油墨，默认是不导出背景图及背景色的
    // 坑点，必须加
    printBackground: true,
  })
}

function oepnDir(dir: string) {
  switch (process.platform) {
    case "darwin":
      child_process.exec("open .")
      break
    case "win32":
      child_process.exec("explorer .")
      break
    default:
  }
}
oepnDir(".")
