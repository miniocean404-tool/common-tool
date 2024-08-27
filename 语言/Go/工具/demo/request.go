package demo

import (
	"fmt"
	"go-script/src/utils/common/request"
)

type Wz struct {
	Ret         int64        `json:"ret"`
	ErrMsg      string       `json:"err_msg"`
	ErrDesc     string       `json:"err_desc"`
	OpenLinkRsp *OpenLinkRsp `json:"open_link_rsp"`
}

type OpenLinkRsp struct {
	OpenlinkSwitch bool           `json:"openlink_switch"`
	Gid            int64          `json:"gid"`
	MultiCFGType   int64          `json:"multi_cfg_type"`
	LoginBackImg   string         `json:"login_back_img"`
	GiftInfoList   []GiftInfoList `json:"gift_info_list"`
	Rule           string         `json:"rule"`
	CommShowInfo   string         `json:"comm_show_info"`
	SwitchRole     int64          `json:"switch_role"`
}

type GiftInfoList struct {
	GiftName string `json:"gift_name"`
	GiftPic  string `json:"gift_pic"`
	GiftDesc string `json:"gift_desc"`
	GiftID   int64  `json:"gift_id"`
}

func DemoRequest() {
	id := "123456"

	req := request.New("https://api.igame.qq.com/merc.plugin.pullnew_cgi.pullnew_cgi/QueryMHOpenlink?tstamp=1721822584630&g_app_tk=2015996026").R()

	req.SetHeaders(
		map[string]string{
			"Content-Type":    "application/json",
			"Accept":          "application/json",
			"host":            "api.igame.qq.com",
			"user-agent":      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090b13) XWEB/9185 Flue",
			"origin":          "https://igame.qq.com",
			"sec-fetch-site":  "same-site",
			"sec-fetch-mode":  "cors",
			"sec-fetch-dest":  "empty",
			"referer":         "https://igame.qq.com/",
			"accept-encoding": "gzip, deflate, br",
			"accept-language": "zh-CN,zh;q=0.9",
			"cookie":          `tiplogin_accesstoken=82_cKjQPov_IC-m1HBD5EDBraApysBxv146TJ_0_hVQEPxwiBvMTXQS6Sr1xWDa8Lla-XKQEsOtwXvnWNyJR_bZ6SZssrXM8pfuCx3wzfgIqmg; tiplogin_openid=onevZjrEdzPP7vy1gaaJ2hDe318M; tiplogin_refreshtoken=82_IJYl6vTpOFvKdI8X9sgRIZH1w8JVIbhX4h35MoDjszpLyQV0PBoBGWFsffIoIiUJyA0ysK4GnY2rXEc8ZiWtWqy40XEVK3mR2OVjfKrcoAM; tiplogin_sessionid=1768193c-49b3-11ef-b2c0-62caa0f7a0ca; tiplogin_nick=%E6%88%91%E6%98%AF%E5%B0%8F%E6%B5%B7%E6%B4%8B%E5%91%80; tiplogin_headurl=https://thirdwx.qlogo.cn/mmopen/vi_32/beQzD0qFHEnyxazPD1JWkpwmjXGXuoRV9cXNYn0zaE3Nx1xumIpeVicRW9WYekTKSJVhylh7ic0uZmicldxevmj3zbjuhVbibDibayCia4ULqnBcA/132; tip_token=2015996026; tiplogin_type=WX; tiplogin_appname=pvpapp; bFirst=o5P-OjmdqewSpW-W7hVYJ47DeOaM`,
		},
	)
	req.SetBody(
		map[string]interface{}{
			"gid":          1,
			"brand_id":     "b1682050540",
			"multi_cfg_id": "6e2258bedb409622213f3a7666051e5b",
			"plat_type":    1,
			"mh_code":      fmt.Sprintf("bizMHCode.%s", id),
		},
	).SetResult(&Wz{})
	resp, err := req.Post("")
	if err != nil {
		return
	}
	json := resp.Result().(*Wz)

	if json.OpenLinkRsp != nil {

	}
}
