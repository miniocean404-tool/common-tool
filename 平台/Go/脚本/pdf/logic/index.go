package logic

import (
	"context"
	"fmt"
	"go-script/src/pdf"
	"log"
	"net/url"
	"os"
	"path"

	"github.com/chromedp/chromedp"
)

var user = User{username: "", passowrd: ""}

var baseUrl = ``

var tasks = []pdf.Task{
	{Name: "用户手册", Path: ""},
	{Name: "保修手册", Path: ""},
}

func Exec() {
	log.SetFlags(log.Lmsgprefix | log.Ldate | log.Ltime | log.Lshortfile)

	tasks := initTask()

	pdf.InitChromeDp(func(ctx context.Context) {
		var buf []byte
		if err := chromedp.Run(ctx, Login(getBaseUrl(), user)); err != nil {
			log.Fatal(err)
		}

		header, footer := pdf.PDFHeaderFooterHandle()

		for _, task := range tasks {
			task.Url.Path = task.Path
			// 文章：https://juejin.cn/post/7000282509959233567
			if err := chromedp.Run(ctx, pdf.PrintToPDF(task.Url, header, footer, &buf)); err != nil {
				log.Fatal(err)
			}

			if err := os.WriteFile(task.Name, buf, os.ModePerm); err != nil {
				log.Fatal(err)
			}

			pdf.OpenDir(path.Dir(task.Name))
		}

	})

	fmt.Println("生成结束")
}

func initTask() []pdf.Task {
	for i, task := range tasks {
		cwd, err := os.Getwd()
		if err != nil {
			log.Fatalln(err)
		}

		tasks[i].Name = path.Join(cwd, fmt.Sprint(task.Name, ".pdf"))
		tasks[i].Url = getBaseUrl()
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
