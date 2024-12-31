package keys

import (
	"fmt"
	"time"
	"unsafe"
)

var procMouseEvent = dll.NewProc("mouse_event")
var procSetCursorPos = dll.NewProc("SetCursorPos")
var procGetCursorPos = dll.NewProc("GetCursorPos")

// 定义 POINT 结构体
type POINT struct {
	X int32
	Y int32
}

// 定义鼠标事件常量
const (
	MOUSEEVENTF_LEFTDOWN   = 0x0002 // 鼠标左键按下
	MOUSEEVENTF_LEFTUP     = 0x0004 // 鼠标左键抬起
	MOUSEEVENTF_RIGHTDOWN  = 0x0008 // 鼠标右键按下
	MOUSEEVENTF_RIGHTUP    = 0x0010 // 鼠标右键抬起
	MOUSEEVENTF_MIDDLEDOWN = 0x0020 // 鼠标中键按下
	MOUSEEVENTF_MIDDLEUP   = 0x0040 // 鼠标中键抬起
)

var CursorPos POINT

// 设置鼠标位置
func SetMouse(x int, y int, isAbsolute bool) {
	if isAbsolute {
		procSetCursorPos.Call(uintptr(int32(x)), uintptr(int32(y)))
	} else {
		// 获取当前鼠标位置
		procGetCursorPos.Call(uintptr(unsafe.Pointer(&CursorPos)))
		fmt.Println("cursorPos: ", CursorPos.X, CursorPos.Y)
		// 设置获取的位置的基础上移动鼠标位置
		procSetCursorPos.Call(uintptr(CursorPos.X+int32(x)), uintptr(CursorPos.Y+int32(y)))
	}
}

func ClickMouse(str string) {
	// 鼠标左键点击
	if str == "L" {
		procMouseEvent.Call(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
		time.Sleep(50 * time.Millisecond) // 短暂延迟
		procMouseEvent.Call(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0)
	} else
	// 鼠标右键点击
	if str == "R" {
		procMouseEvent.Call(MOUSEEVENTF_RIGHTDOWN, 0, 0, 0, 0)
		time.Sleep(50 * time.Millisecond) // 短暂延迟
		procMouseEvent.Call(MOUSEEVENTF_RIGHTUP, 0, 0, 0, 0)
	} else
	// 鼠标中键点击
	if str == "M" {
		procMouseEvent.Call(MOUSEEVENTF_MIDDLEDOWN, 0, 0, 0, 0)
		time.Sleep(50 * time.Millisecond) // 短暂延迟
		procMouseEvent.Call(MOUSEEVENTF_MIDDLEUP, 0, 0, 0, 0)
	}
}
