package common

import (
	"fmt"
	"runtime"
)

func GetTrace(skip int) {
	// 0 获取的是 GetTrace 函数的调用栈
	// 1 获取的是 GetTrace 函数调用者的调用栈

	// pc 是调用栈的标识符，通过 FuncForPC 可以获取 调用栈标识符 pc 对应的调用栈的函数信息(*Func),如果没有对应的调用栈则是 nil
	pc, file, line, ok := runtime.Caller(skip)
	fnInfo := runtime.FuncForPC(pc)

	if ok {
		fmt.Printf("文件路径：%#v\n", file)
		fmt.Printf("行号：%#v\n", line)
		fmt.Printf("函数名：%#v\n", fnInfo.Name())
	} else {
		fmt.Println(fmt.Errorf("获取调用信息失败"))
	}
}
