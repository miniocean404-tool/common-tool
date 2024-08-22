package webhook

import (
	"github.com/go-resty/resty/v2"
	"github.com/tidwall/gjson"
	"go.uber.org/zap"
)

func NotifyEnterpriseWechat(key string, content string) {
	resp, err := resty.New().R().
		SetQueryParams(map[string]string{
			"key": key,
		}).
		SetBody(map[string]interface{}{
			"msgtype": "text",
			"text": map[string]interface{}{
				"content":               content,
				"mentioned_list":        []string{"@all"},
				"mentioned_mobile_list": []string{"@all"},
			},
		}).
		Post("https://qyapi.weixin.qq.com/cgi-bin/webhook/send")
	if err != nil {
		return
	}

	isOk := gjson.Get(string(resp.Body()), "errmsg")
	if isOk.String() == "ok" {
		zap.S().Info("✅  企业微信推送成功", isOk)
	}
}
