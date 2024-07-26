// https://juejin.cn/post/7000282509959233567
// "puppeteer": "^22.13.1"

import puppeteer, { type Page } from "puppeteer"

const PDFUrl = [{ name: "用户手册", url: "https://cn.davincimotor.com/recommend" }]

;(async () => {
  const browser = await puppeteer.launch({ headless: "shell" })
  const page = await browser.newPage()

  for (const doc of PDFUrl) {
    await genPDF({ page, url: doc.url, name: doc.name })
  }

  PDFUrl.forEach(async (doc) => {})

  await browser.close()
})()

interface GeneratePDF {
  page: Page
  url: string
  name: string
}

async function genPDF({ page, url, name }: GeneratePDF) {
  await page.goto(url, { waitUntil: "networkidle2" })

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
    path: `/Users/user/Desktop/${name}.pdf`,
    format: "a4",
    displayHeaderFooter: true,
    headerTemplate,
    // 页脚的模板
    footerTemplate,
    margin: {
      top: "1.5cm",
      bottom: "1.5cm",
      left: "1cm",
      right: "1cm",
    },
    // 给页面优先级声明的任何CSS @page 大小超过 width 和 height 或 format 选项中声明的大小。 默认为 false，它将缩放内容以适合纸张大小。
    preferCSSPageSize: true,
    // 开启渲染背景色，因为 puppeteer 是基于 chrome 浏览器的，浏览器为了打印节省油墨，默认是不导出背景图及背景色的
    // 坑点，必须加
    printBackground: true,
  })
}
