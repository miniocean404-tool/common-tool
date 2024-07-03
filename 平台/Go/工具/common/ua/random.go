package ua

import (
	"math/rand"
	"time"
)

var UAIns string
var userUa = map[string]string{}

func randomUA() string {
	// 设置随机种子
	rand.New(rand.NewSource(time.Now().UnixNano()))

	// 随机获取数组中的数据
	num := rand.Intn(len(UserAgents))
	UA := UserAgents[num]

	return UA
}
