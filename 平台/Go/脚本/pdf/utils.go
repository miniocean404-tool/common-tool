package pdf

import (
	"context"
	"errors"
	"os/exec"
	"runtime"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

// 厘米转英尺
func Cm2inchies(cm float64) float64 {
	return cm / 2.54
}

// 等待网络空闲 需要开启 network.Enable()
func AwaitNetworkIdle() chromedp.ActionFunc {
	return chromedp.ActionFunc(func(ctx context.Context) error {
		type WaitUntilEvent string
		const (
			WaitUntilLoad              WaitUntilEvent = "load"              // load 函数执行
			WaitDomContentLoaded       WaitUntilEvent = "DOMContentLoaded"  // dom 加载完成
			WaitUntilNetworkIdle       WaitUntilEvent = "networkIdle"       // 网络空闲
			WaitUntilNetworkAlmostIdle WaitUntilEvent = "networkAlmostIdle" // 网络几乎空闲
		)
		ch := make(chan struct{})
		cctx, cancelCctx := context.WithCancel(ctx)

		chromedp.ListenTarget(cctx, func(ev interface{}) {
			switch e := ev.(type) {
			case *page.EventLifecycleEvent:
				if e.Name == string(WaitUntilNetworkIdle) {
					close(ch)
					cancelCctx()
				}
			}
		})

		select {
		case <-ch:
			return nil
		case <-cctx.Done():
			if errors.Is(cctx.Err(), context.DeadlineExceeded) {
				return errors.New("执行超时")
			} else {
				return errors.New("上下文接错，未知错误")
			}
		}
	})
}

func OpenDir(dir string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("open", dir)
	case "darwin":
		cmd = exec.Command("explorer", dir)
	}
	cmd.Run()
}
