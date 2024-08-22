package common

import (
	"fmt"
	"time"
)

func SetTimeout(t time.Duration) {
	timer := time.NewTimer(t)
	<-timer.C
}

func SetInterval() {
	//ticker := time.NewTicker(time.Second * 3)
	//defer ticker.Stop()
	//
	//for {
	//	select {
	//	case <-ticker.C:
	//		fmt.Println("tick")
	//	}
	//}

	//模拟网络请求
	ch := make(chan int, 1)
	go func() {
		// 假设请求需要2秒钟才能得到响应
		time.Sleep(2 * time.Second)
		ch <- 1
	}()

	// 设置超时时间为1秒钟
	timeout := time.NewTimer(3 * time.Second)

	select {
	case <-ch:
		fmt.Println("获取响应")
	case <-timeout.C:
		fmt.Println("Timeout.")
	}

	// 停止定时器，释放资源
	if !timeout.Stop() {
		<-timeout.C
	}
}
