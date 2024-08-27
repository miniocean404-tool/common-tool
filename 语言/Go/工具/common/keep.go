package common

import (
	"math"
	"os"
	"os/signal"
	"time"
)

// 通过睡眠保持不退出
func KeepNoExitSleep() {
	time.Sleep(time.Duration(math.MaxInt64))
}

func KeepNoExitFor() {
	for {
	}
}

// 通过系统信号保持不退出
// c := <-ch
// fmt.Println(c)
func KeepNoExitSignal() chan os.Signal {
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt, os.Kill)

	return ch
}
