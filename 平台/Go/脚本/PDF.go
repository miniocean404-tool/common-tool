package main

import (
	"context"
	"log"
	"os"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

func main() {
	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", false),
		chromedp.Flag("disable-gpu", false),
		chromedp.Flag("no-sandbox", true),
		chromedp.Flag("ignore-certificate-errors", true),
		// chromedp.WindowSize(1920, 1080),
	)
	allocCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancel()
	ctx, cancel := chromedp.NewContext(allocCtx, chromedp.WithDebugf(log.Printf))
	defer cancel()

	var buf []byte
	if err := chromedp.Run(ctx, printToPDF(`https://cn.testing.davincimotor.com/book/user`, &buf)); err != nil {
		log.Fatal(err)
	}

	if err := os.WriteFile("test.pdf", buf, 0o644); err != nil {
		log.Fatal(err)
	}
}

func printToPDF(url string, res *[]byte) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(url),
		chromedp.ActionFunc(func(ctx context.Context) error {
			params := page.
				PrintToPDF().
				WithMarginTop(.5).
				WithPrintBackground(true).
				WithDisplayHeaderFooter(true).
				WithHeaderTemplate(`<div style="font-size:8px;width:100%;text-align:center;"><span class="title"></span> -- <span class="url"></span></div>`)

			buf, _, err := params.Do(ctx)

			if err != nil {
				return err
			}
			*res = buf
			return nil
		}),
	}
}
