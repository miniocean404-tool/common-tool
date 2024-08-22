package common

import (
	"math"
	"time"
)

// 通过睡眠保持不退出
func KeepNoExitForSleep() {
	time.Sleep(time.Duration(math.MaxInt64))
}

func KeepNoExitForF() {
	for {
	}
}
