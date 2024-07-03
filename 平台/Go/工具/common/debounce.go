package common

import (
	"sync"
	"time"
)

// NewDebounce 防抖
func NewDebounce(interval time.Duration) func(func()) {
	var l sync.Mutex
	var timer *time.Timer

	return func(fn func()) {
		l.Lock()
		defer l.Unlock()
		// 使用 lock 保证 timer 更新之前一定先 Stop.
		if timer != nil {
			timer.Stop()
		}
		timer = time.AfterFunc(interval, fn)
	}
}
