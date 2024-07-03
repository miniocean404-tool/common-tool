package webhook

import (
	"github.com/go-resty/resty/v2"
	"github.com/tidwall/gjson"
	"go.uber.org/zap"
)

func NotifyPushPlus(token string, title string, content string, template string) {
	resp, err := resty.New().R().
		SetBody(map[string]interface{}{
			"token":    token,
			"title":    title,
			"content":  content,
			"template": template,
			"channel":  "wechat",
		}).Post("https://www.pushplus.plus/api/send")
	if err != nil {
		return
	}

	isOk := gjson.Get(string(resp.Body()), "errmsg")
	if isOk.String() == "ok" {
		zap.S().Info("✅  Push Plus 推送成功", isOk)
	}
}
