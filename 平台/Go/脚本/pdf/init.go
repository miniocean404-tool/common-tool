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

func InitChromeDp(exec func(ctx context.Context)) {
	opts := append(
		chromedp.DefaultExecAllocatorOptions[:],
		chromedp.DisableGPU,                               // 禁用 GPU 进程 （--disable-gpu）
		chromedp.Flag("headless", "shell"),                // 是否关闭界面
		chromedp.Flag("ignore-certificate-errors", false), // 忽略错误
		chromedp.Flag("disable-web-security", true),       // 禁用网络安全标志
		chromedp.Flag("disable-extensions", true),         // 插件支持
		chromedp.Flag("no-sandbox", true),                 // 取消沙盒模式 linux 系统中必须开启
		chromedp.Flag("disable-sync", true),               // 禁止同步

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
