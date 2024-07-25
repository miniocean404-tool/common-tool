package pdf

import (
	"context"
	"net/url"
	"regexp"
	"strings"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

func PDFHeaderFooterHandle() (header string, footer string) {
	header, footer = GetHeaderFooterHTML()

	pattern := regexp.MustCompile(`(?m)src="(?P<path>.*?)"`)
	base64Png := Png2Base64()

	for _, match := range pattern.FindAllStringSubmatch(header, -1) {
		header = strings.ReplaceAll(header, match[1], base64Png)
	}

	return header, footer
}

func PrintToPDF(url *url.URL, header string, footer string, res *[]byte) chromedp.Tasks {

	return chromedp.Tasks{
		// 等待元素加载
		chromedp.Navigate(url.String()),
		chromedp.ActionFunc(func(ctx context.Context) error {
			//  `Letter`: 8.5in x 11in
			//  `Legal`: 8.5in x 14in
			//  `Tabloid`: 11in x 17in
			//  `Ledger`: 17in x 11in
			//  `A0`: 33.1in x 46.8in
			//  `A1`: 23.4in x 33.1in
			//  `A2`: 16.54in x 23.4in
			//  `A3`: 11.7in x 16.54in
			//  `A4`: 8.27in x 11.7in
			//  `A5`: 5.83in x 8.27in
			//  `A6`: 4.13in x 5.83in

			params := page.
				PrintToPDF().
				WithMarginTop(0).
				WithScale(1).
				WithPaperWidth(8.27).
				WithPaperHeight(11.7).
				WithPrintBackground(true).
				WithDisplayHeaderFooter(true).
				WithHeaderTemplate(header).
				WithFooterTemplate(footer).
				WithMarginTop(Cm2inchies(2)).
				WithMarginBottom(Cm2inchies(2)).
				WithMarginLeft(Cm2inchies(1)).
				WithMarginRight(Cm2inchies(1)).
				// 给页面优先级声明的任何 CSS @page 大小超过 width 和 height 或 format 选项中声明的大小。 默认为 false，它将缩放内容以适合纸张大小。
				WithPreferCSSPageSize(true)

			buf, _, err := params.Do(ctx)

			if err != nil {
				return err
			}
			*res = buf
			return nil
		}),
	}
}
