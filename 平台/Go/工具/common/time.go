package common

import (
	"go.uber.org/zap"
	"time"
)

func Timeout(timer string, lead int) {
	t, err := time.Parse("15:04:05", timer)
	if err != nil {
		zap.S().Error(err)
	}

	today := time.Now()
	execTime := time.Date(today.Year(), today.Month(), today.Day(), t.Hour(), t.Minute(), t.Second(), 0, today.Location())
	execTime = execTime.Add(time.Duration(-lead) * time.Millisecond)

	for {
		now := time.Now()
		if now.Equal(execTime) || now.After(execTime) {
			break
		}
	}
}
