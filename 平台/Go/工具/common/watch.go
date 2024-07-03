package common

import (
	"time"

	"github.com/fsnotify/fsnotify"
	"go.uber.org/zap"
)

var Watcher, err = fsnotify.NewWatcher()

func WatchFile(file string, fn func()) {
	fn()

	if err != nil {
		zap.S().Error(err)
	}
	defer Watcher.Close()

	debounceFunc := NewDebounce(time.Millisecond * 1000)

	go func() {
		for {
			select {
			case event, ok := <-Watcher.Events:
				if !ok {
					return
				}

				if event.Has(fsnotify.Write) {
					debounceFunc(func() {
						fn()
					})
				}
			case err, ok := <-Watcher.Errors:
				if !ok {
					return
				}
				zap.S().Error(err)
			}
		}
	}()

	err = Watcher.Add(file)
	if err != nil {
		zap.S().Error(err)
	}

	// 等待数据
	<-make(chan struct{})
	// 关闭渠道
	close(make(chan struct{}))
}
