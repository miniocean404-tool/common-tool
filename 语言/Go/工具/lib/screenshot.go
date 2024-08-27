package lib

import (
	"bytes"
	"image/jpeg"

	"github.com/kbinani/screenshot"
)

func Screenshot(quality int) ([]byte, error) {
	if quality == 0 {
		quality = 75
	}

	// 获取屏幕数量
	// screens := screenshot.NumActiveDisplays()

	bounds := screenshot.GetDisplayBounds(0)
	img, err := screenshot.CaptureRect(bounds)
	if err != nil {
		return nil, err
	}

	var buf bytes.Buffer
	err = jpeg.Encode(&buf, img, &jpeg.Options{Quality: quality})
	if err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
