package logic

import (
	"context"
	"fmt"
	"go-script/src/pdf"
	"log"
	"net/url"
	"os"
	"path"
	"sync"

	"github.com/chromedp/chromedp"
)

var user = User{username: "18515450826", passowrd: "123456"}
var baseUrl = `https://cn.testing.davincimotor.com`
var output = `/Users/user/Desktop/work-code/front-end/davinci-web/assets/pdf`

var tasks = []pdf.Task{
	{Name: "用户手册", Path: "/book/user"},
	{Name: "保修手册", Path: "/book/fix"},
}

func Exec() {
	log.SetFlags(log.Lmsgprefix | log.Ldate | log.Ltime | log.Lshortfile)

	tasks := initParams()

	wg := sync.WaitGroup{}

	for _, task := range tasks {
		wg.Add(1)

		go pdf.InitChromeDp(func(ctx context.Context) {
			defer wg.Done()
			var buf []byte
			if err := chromedp.Run(ctx, Login(getBaseUrl(), user)); err != nil {
				log.Fatal(err)
			}

			header, footer := pdf.PDFHeaderFooterHandle()

			task.Url.Path = task.Path
			if err := chromedp.Run(ctx, pdf.PrintToPDF(task.Url, header, footer, &buf)); err != nil {
				log.Fatal(err)
			}

			if err := os.WriteFile(task.Name, buf, os.ModePerm); err != nil {
				log.Fatal(err)
			}

		})
	}

	wg.Wait()

	pdf.OpenDir(output)
	fmt.Println("✅ 生成结束")
}

func initParams() []pdf.Task {
	for i, task := range tasks {
		tasks[i].Name = path.Join(output, fmt.Sprint(task.Name, ".pdf"))
		tasks[i].Url = getBaseUrl()
	}

	err := os.MkdirAll(output, os.ModePerm)
	if err != nil {
		log.Fatalln("创建输出文件夹错误")
	}

	return tasks
}

func getBaseUrl() *url.URL {
	url, err := url.Parse(baseUrl)
	if err != nil {
		log.Panicln("URL 解析失败")
	}

	return url
}
