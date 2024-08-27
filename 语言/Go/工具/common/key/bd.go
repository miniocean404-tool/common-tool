package keys

import "time"

var procKeyBd = dll.NewProc("keybd_event")

type ButtonBd struct {
	keys []int
}

// 清除按键
func (k *ButtonBd) Clear() *ButtonBd {
	k.keys = []int{}
	return k
}

func (k *ButtonBd) SetKeys(keys ...int) {
	k.keys = keys
}

// 添加一个按键
func (k *ButtonBd) AddKey(key int) {
	k.keys = append(k.keys, key)
}

// 执行绑定的 key
func (k *ButtonBd) Execute() error {
	err := k.Press()
	if err != nil {
		return err
	}
	time.Sleep(10 * time.Millisecond)
	err = k.Release()
	return err
}

// 按下按键
func (k *ButtonBd) Press() error {
	for _, key := range k.keys {
		downKey(key)
	}
	return nil
}

// 释放按键
func (k *ButtonBd) Release() error {
	for _, key := range k.keys {
		upKey(key)
	}
	return nil
}

func downKey(key int) {
	flag := 0

	// 检测键码是否为虚拟键码，还是扫描码
	if key < 0xFFF {
		flag |= _KEYEVENTF_SCANCODE
	} else {
		key -= 0xFFF
	}

	// 将键码加上 0x80（128），以生成虚拟键码。这通常用于将扫描码转换为虚拟键码。
	vkey := key + 0x80

	// 参数 1,2,3,4 分别为 keyCode , extendedKeyCode , flags , extraInfo
	procKeyBd.Call(uintptr(key), uintptr(vkey), uintptr(flag), 0)
}

func upKey(key int) {
	flag := _KEYEVENTF_KEYUP

	// 检测键码是否为虚拟键码，还是扫描码
	if key < 0xFFF {
		flag |= _KEYEVENTF_SCANCODE
	} else {
		key -= 0xFFF
	}

	// 将键码加上 0x80（128），以生成虚拟键码。这通常用于将扫描码转换为虚拟键码。
	vkey := key + 0x80
	procKeyBd.Call(uintptr(key), uintptr(vkey), uintptr(flag), 0)
}
