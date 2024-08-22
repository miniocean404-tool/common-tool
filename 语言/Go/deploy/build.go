package main

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"path"
	"runtime"
)

var entry = `src/main.go`
var dist = `dist/`

type TargetOs struct {
	os   string
	arch string
}

type BuildInfo struct {
	entry string
	out   string
	dist  string
	TargetOs
}

var build = []TargetOs{
	{"windows", "amd64"},
	{"windows", "386"},
	{"darwin", "amd64"},
	{"darwin", "arm64"},
	{"linux", "amd64"},
	{"linux", "arm64"},
}

func main() {
	var compress []BuildInfo
	for _, platform := range build {
		out := getOut(platform.os, platform.arch)

		// 打包
		buildCommand(entry, out, platform.os, platform.arch)
		// 开始压缩
		switch platform.os {
		case "windows":
			compress = append(compress, BuildInfo{entry, out, dist, platform})
		}
	}

	for _, info := range compress {
		upxCompress(getDir(), info.out)
	}
}

// 个人电脑一般都是 amd64
// 386 也称 x86 对应 32位操作系统
// amd64 也称 x64 对应 64位操作系统
// arm 这种架构一般用于嵌入式开发。 比如 Android ， IOS ， Win mobile , TIZEN 等
func buildCommand(target string, out string, platform string, arch string) {
	// 表示CGO禁用 交叉编译中不能使用CGO的
	os.Setenv("CGO_ENABLED", "0")
	os.Setenv("GOOS", platform)
	os.Setenv("GOARCH", arch)

	cmd := exec.Command("go", "build", "-o", out, `-ldflags=-w -s`, target)
	// defer cmd.Process.Kill()

	var stdout bytes.Buffer // 也可以输出到 bytes.Buffer 的 out 中
	cmd.Stdout = &stdout    // 把执行命令的标准输出定向到out
	cmd.Stderr = os.Stderr  // 把命令的错误输出定向到 os

	// start 异步执行 run 同步阻塞
	err := cmd.Run()

	if err != nil {
		fmt.Printf("打包名称执行错误: %v\n", err)
		return
	}

	fmt.Printf("%s %s 打包完成\n", platform, arch)
}

// upx 压缩
func upxCompress(cwd string, target string) {
	upx := path.Join(cwd, "upx.exe")

	fmt.Println(upx, target)

	if _, err := os.Stat(upx); os.IsNotExist(err) {
		fmt.Println("upx.exe 不存在")
		return
	}

	cmd := exec.Command(upx, "-9", target)

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Run()

	if err != nil {
		fmt.Printf("压缩执行错误: %v\n", err)
		return
	}
}

func getOut(platform string, arch string) string {
	var outName string

	switch platform {
	case "windows":
		outName = fmt.Sprintf(`%s/%s-%s%s`, dist, platform, arch, ".exe")
	default:
		outName = fmt.Sprintf(`%s/%s-%s`, dist, platform, arch)
	}

	return outName
}

func getDir() string {
	_, file, _, ok := runtime.Caller(1)

	if ok {
		return path.Dir(file)
	} else {
		return ""
	}
}
