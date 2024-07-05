package main

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
)

var entry = `src/main.go`
var dist = `dist/bin`

type BuildPlatform struct {
	os   string
	arch string
}

var await = []BuildPlatform{
	{"windows", "amd64"},
	{"windows", "386"},
	{"darwin", "amd64"},
	{"darwin", "arm64"},
	{"linux", "amd64"},
	{"linux", "arm64"},
}

func main() {
	for _, platform := range await {
		buildCommand(entry, platform.os, platform.arch)
	}
}

// 个人电脑一般都是 amd64
// 386 也称 x86 对应 32位操作系统
// amd64 也称 x64 对应 64位操作系统
// arm 这种架构一般用于嵌入式开发。 比如 Android ， IOS ， Win mobile , TIZEN 等
func buildCommand(target string, platform string, arch string) {
	// 表示CGO禁用 交叉编译中不能使用CGO的
	os.Setenv("CGO_ENABLED", "0")
	os.Setenv("GOOS", platform)
	os.Setenv("GOARCH", arch)

	var outName string

	switch platform {
	case "windows":
		outName = fmt.Sprintf(`%s/%s-%s%s`, dist, platform, arch, ".exe")
	default:
		outName = fmt.Sprintf(`%s/%s-%s`, dist, platform, arch)
	}

	cmd := exec.Command("go", "build", "-o", outName, `-ldflags=-w -s`, target)
	// defer cmd.Process.Kill()

	var out bytes.Buffer   // 也可以输出到 bytes.Buffer 的 out 中
	cmd.Stdout = &out      // 把执行命令的标准输出定向到out
	cmd.Stderr = os.Stderr // 把命令的错误输出定向到 os

	// start 异步执行 run 同步阻塞
	err := cmd.Run()
	if err != nil {
		fmt.Printf("err: %v\n", err)
		return
	}

	fmt.Println("打包完成")
}
