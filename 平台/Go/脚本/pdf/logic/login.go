package logic

import (
	"go-script/src/pdf"
	"net/url"

	"github.com/chromedp/cdproto/network"
	"github.com/chromedp/chromedp"
)

type User struct {
	username string
	passowrd string
}

func Login(url *url.URL, user User) chromedp.Tasks {
	url.Path = "/passport/signIn"

	return chromedp.Tasks{
		chromedp.Navigate(url.String()),
		// 等待元素加载
		chromedp.WaitVisible("html > body"),
		// SendKeys 模拟键盘输入
		chromedp.SendKeys(`#__layout > div > div > div.container-sign-in > div.form > div:nth-child(1) > div.slot > div > div > div > input`, user.username, chromedp.ByQuery),                                           // chrome 元素复制 selector
		chromedp.SendKeys(`document.querySelector("#__layout > div > div > div.container-sign-in > div.form > div:nth-child(2) > div.slot > div > div > div > input[type=password]")`, user.passowrd, chromedp.ByJSPath), // chrome 元素复制 js path
		chromedp.Click(`#__layout > div > div > div.container-sign-in > div.form > div.davinci-checkbox-component > div.indicator`, chromedp.ByQuery),
		network.Enable(),
		chromedp.Click(`//*[@id="__layout"]/div/div/div[3]/div[2]/div[5]/button`), // 默认：chrome 元素复制 xpath
		pdf.AwaitNetworkIdle(),
		network.Disable(),
	}
}
