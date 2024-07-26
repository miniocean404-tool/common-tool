package pdf

import (
	"context"
	"net/url"

	"github.com/chromedp/chromedp"
)

type Task struct {
	Name string
	Path string
	Url  *url.URL
}

// chrome 启动参数：https://peter.sh/experiments/chromium-command-line-switches/
func InitChromeDp(exec func(ctx context.Context)) {
	opts := append(
		chromedp.DefaultExecAllocatorOptions[:],
		chromedp.DisableGPU,                                        // 禁用 GPU 进程 （--disable-gpu）
		chromedp.Flag("headless", "shell"),                         // 是否关闭界面
		chromedp.Flag("ignore-certificate-errors", false),          // 忽略错误
		chromedp.Flag("disable-web-security", true),                // 禁用网络安全标志
		chromedp.Flag("disable-extensions", true),                  // 插件支持
		chromedp.Flag("no-sandbox", true),                          // 取消沙盒模式 linux 系统中必须开启
		chromedp.Flag("no-zygote", true),                           // 禁止使用 zygote 进程来派生子进程。相反，子进程将被分叉并直接执行。请注意，--no-sandbox 也应与此标志一起使用，因为沙箱需要 zygote 才能工作
		chromedp.Flag("disable-sync", true),                        // 禁止同步
		chromedp.Flag("hide-scrollbars", true),                     // 防止为 Web 内容创建滚动条。对于获取一致的屏幕截图很有用
		chromedp.Flag("disable-dev-shm-usage", true),               // 防止在某些 VM 环境中 /dev/shm 分区太小，导致 Chrome 失败或崩溃
		chromedp.Flag("no-first-run", true),                        // 跳过首次运行任务，并且不显示其他对话框、提示或气泡
		chromedp.Flag("disable-extensions", true),                  // 禁用扩展
		chromedp.Flag("disable-file-system", true),                 // 禁用文件系统
		chromedp.Flag("disable-background-networking", true),       // 禁用多个在后台运行网络请求的子系统。这在进行网络性能测试时使用，以避免测量中出现噪音
		chromedp.Flag("disable-default-apps", true),                // 首次运行时禁用默认应用程序的安装。这在自动化测试期间使用
		chromedp.Flag("metrics-recording-only", true),              // 启用指标报告的记录但禁用报告。与 kForceEnableMetricsReporting 相比，它执行普通客户端用于报告的所有代码，除了报告被丢弃而不是发送到服务器。这对于在 UI 和性能测试期间查找指标代码中的问题非常有用
		chromedp.Flag("mute-audio", true),                          // 将发送到音频设备的音频静音，以便在自动化测试期间听不到声音
		chromedp.Flag("ignore-certificate-errors-spki-list", true), // 一组公钥哈希值，用于忽略与证书相关的错误。如果服务器提供的证书链未验证，并且一个或多个证书具有与此列表中的密钥匹配的公钥哈希，则该错误将被忽略。开关值必须是 Base64 编码的 SHA-256 SPKI 指纹的逗号分隔列表（RFC 7469，第 2.4 节）。除非 --user-data-dir （由内容嵌入器定义）也存在，否则此开关无效
		chromedp.Flag("font-render-hinting=full", true),            // 设置无头运行时的字体渲染提示，影响 Skia 渲染以及是否启用字形子像素定位。可能的值：none|slight|medium|full|max。默认值：full

		// chromedp.UserDataDir("./tmp/chrome"),              // 用户数据目录
		// chromedp.UserAgent(`Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36`),
		chromedp.WindowSize(2560, 1440),
	)
	allocCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancel()

	// 创建一个 chrome 实例, 默认是 headless 的方式运行
	// NewContext 可添加 chromedp.WithDebugf(log.Printf)
	ctx, cancel := chromedp.NewContext(allocCtx)
	defer cancel()

	exec(ctx)
}
