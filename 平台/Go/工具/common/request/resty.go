// 文章：https://juejin.cn/post/7035800426293231653?searchId=202308221833152D97E0A78FDCAF89B7DB

package request

import (
	"fmt"
	"net/http"
	"net/url"
	"sync"
	"time"

	"github.com/go-resty/resty/v2"
	"go.uber.org/zap"
)

var lock sync.Mutex
var instance *ClientInstance
var once sync.Once

type ClientInstance struct {
	dynamicClient map[string]*resty.Client // 动态 client 缓存
	config        Request
}

func I() *ClientInstance {
	once.Do(func() {
		instance = &ClientInstance{}
		instance.dynamicClient = make(map[string]*resty.Client)
	})
	return instance
}

func (c ClientInstance) Client(fullUrl string) *resty.Client {
	lock.Lock()
	defer lock.Unlock()

	parse, err := url.Parse(fullUrl)
	if err != nil {
		zap.S().Error(err)
	}

	origin := fmt.Sprintf("%s://%s", parse.Scheme, parse.Host)

	// 检查参数对应的单例是否已存在
	if client, ok := c.dynamicClient[origin]; ok {
		return client
	}

	// 创建新的单例并存储到映射
	client := instance.createClient(origin, c.config)
	c.dynamicClient[origin] = client

	return client
}

func (c *ClientInstance) createClient(baseUrl string, con Request) *resty.Client {
	// con := new(Request)
	c.config = con
	return resty.New().
		SetBaseURL(baseUrl).
		SetHeader("Body-Type", "application/json").
		SetRetryCount(con.MaxTries).
		SetRetryWaitTime(time.Duration(con.IntervalSec) * time.Second).
		SetRetryMaxWaitTime(time.Duration(con.IntervalSec*2) * time.Second).
		SetTimeout(time.Duration(con.TimeOutSec) * time.Second).
		SetTransport(&http.Transport{
			MaxIdleConnsPerHost: 10,                // 设置最大并发连接数为 10
			IdleConnTimeout:     120 * time.Second, // 设置空闲连接的保持时间为 90s,默认 90s
		}).
		SetDebug(false)
}
