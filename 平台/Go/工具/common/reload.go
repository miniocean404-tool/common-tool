package common

import (
	"log"
	"os"
	"os/exec"
)

func Reload() {
	// 获取当前可执行文件的路径
	exe, err := os.Executable()
	if err != nil {
		log.Fatal("获取可执行文件路径失败：", err)
	}

	var argv []string
	for _, arg := range os.Args[0:] {
		argv = append(argv, arg)
	}

	// 获取当前进程的环境变量
	//env := os.Environ()
	// 使用 syscall.New 函数来执行新程序
	//err = syscall.New(exe, argv, env)
	//if err != nil {
	//	panic(err)
	//}

	// 启动新进程
	cmd := exec.Command(exe)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Start(); err != nil {
		panic(err)
	}

	// 杀死当前进程
	os.Exit(0)
}
