package common

import (
	"fmt"
	"os"
	"path"
	"runtime"
)

// 获取当前可执行文件的路径
func GetExecPath() string {
	executable, err := os.Executable()
	if err != nil {
		fmt.Println("Error:", err)
		return executable
	}
	fmt.Println("Executable path:", executable)

	return ""
}

// 获取当前工作目录的路径
func GetCWD() {
	wd, err := os.Getwd()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Current working directory:", wd)
}

// 获取当前文件的文件夹路径
func GetDir() string {
	_, file, _, ok := runtime.Caller(1)

	if ok {
		return path.Dir(file)
	} else {
		return ""
	}
}
