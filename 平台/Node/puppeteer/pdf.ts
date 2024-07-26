// https://juejin.cn/post/7000282509959233567
// "puppeteer": "^22.13.1"

import puppeteer, { type Page } from "puppeteer"

const PDFUrl = [{ name: "用户手册", url: "https://cn.davincimotor.com/recommend" }]

;(async () => {
  const browser = await puppeteer.launch({
    headless: "shell",
    args: [
      "--no-sandbox", // linux系统中必须开启
      "--no-zygote", // 禁止使用 zygote 进程来派生子进程。相反，子进程将被分叉并直接执行。请注意，--no-sandbox 也应与此标志一起使用，因为沙箱需要 zygote 才能工作
      // "--single-process", // 此处关掉单进程
      "--disable-setuid-sandbox",
      "--disable-gpu", // 禁用 GPU 进程 （--disable-gpu）
      "--disable-dev-shm-usage", // 防止在某些 VM 环境中 /dev/shm 分区太小，导致 Chrome 失败或崩溃
      "--no-first-run", // 跳过首次运行任务，并且不显示其他对话框、提示或气泡
      "--disable-extensions", // 禁用扩展
      "--disable-file-system", // 禁用文件系统
      "--disable-background-networking", // 禁用多个在后台运行网络请求的子系统。这在进行网络性能测试时使用，以避免测量中出现噪音
      "--disable-default-apps", // 首次运行时禁用默认应用程序的安装。这在自动化测试期间使用
      "--disable-sync", // 禁止同步
      "--disable-translate",
      "--hide-scrollbars", // 防止为 Web 内容创建滚动条。对于获取一致的屏幕截图很有用
      "--metrics-recording-only", // 启用指标报告的记录但禁用报告。与 kForceEnableMetricsReporting 相比，它执行普通客户端用于报告的所有代码，除了报告被丢弃而不是发送到服务器。这对于在 UI 和性能测试期间查找指标代码中的问题非常有用
      "--mute-audio", // 将发送到音频设备的音频静音，以便在自动化测试期间听不到声音
      "--safebrowsing-disable-auto-update",
      "--ignore-certificate-errors",
      "--ignore-ssl-errors",
      "--ignore-certificate-errors-spki-list", //  一组公钥哈希值，用于忽略与证书相关的错误。如果服务器提供的证书链未验证，并且一个或多个证书具有与此列表中的密钥匹配的公钥哈希，则该错误将被忽略。开关值必须是 Base64 编码的 SHA-256 SPKI 指纹的逗号分隔列表（RFC 7469，第 2.4 节）。除非 --user-data-dir （由内容嵌入器定义）也存在，否则此开关无效
      "--font-render-hinting=medium", // 设置无头运行时的字体渲染提示，影响 Skia 渲染以及是否启用字形子像素定位。可能的值：none|slight|medium|full|max。默认值：full
    ],
  })
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

  // 对于大的PDF生成，可能会时间很久，这里规定不会进行超时处理
  await page.setDefaultNavigationTimeout(0)

  // 定义html内容
  // await page.setContent(this.HTMLStr, { waitUntil: "networkidle2" });

  // 等待字体加载响应
  // await page.evaluateHandle("document.fonts.ready");

  const buffer = await page.pdf({
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

  return buffer
}
