package common

import (
	"fmt"
	"os"
)

func openFile(path string) {
	// 打开指定处的文件，并指定权限为：可读可写，可创建
	// 0755-> rwx r-x r-x linux知识
	_, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE, 0755)
	if err != nil {
	}
}

func readFile(path string) {
	file, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}

	fmt.Println(string(file))
}
