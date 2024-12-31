package keys

import (
	"fmt"
	"syscall"
)

var dll = syscall.NewLazyDLL("user32.dll")

// 运行字符串按键 ，分割
func Run(str string) {
	RunKeys(GetButtons(str)...)
}

// 运行按键
func RunKeys(keys ...int) {
	fmt.Println("RunKeys", keys)
	keyBd := NewKeyBd(keys...)
	keyBd.Execute()
}

// 绑定按键
func NewKeyBd(keys ...int) ButtonBd {
	keyBd := ButtonBd{}
	keyBd.SetKeys(keys...)
	return keyBd
}
