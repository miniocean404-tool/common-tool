package cmd

import (
	"os"
	"os/exec"
	"runtime"
	"syscall"
)

// 启动软件测试：Start-Process C:\Users\ta\Desktop\Geek.exe
// 不弹出黑色命令行窗口还需要编译时候添加：-H windowsgui 例如：go build -o dist/windows-amd64.exe -ldflags="-w -s -H windowsgui" ./src/main.go
func CMDOutput(params []string) (string, error) {
	var c *exec.Cmd
	switch runtime.GOOS {
	case "darwin":
	case "windows":
		para := append([]string{"/C"}, params[0:]...)
		c = exec.Command("cmd", para...)
	case "linux":
		para := append([]string{"-c"}, params[0:]...)
		c = exec.Command("bash", para...)
	}

	// 不弹出黑色命令行窗口
	c.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}

	// c.Output() 只返回标准输出
	output, err := c.CombinedOutput()
	return string(output), err
}

// 异步执行命令
func AsyncCMD(params []string) error {
	var c *exec.Cmd
	switch runtime.GOOS {
	case "darwin":
	case "windows":
		para := append([]string{"/C"}, params[0:]...)
		c = exec.Command("cmd", para...)
	case "linux":
		para := append([]string{"-c"}, params[0:]...)
		c = exec.Command("bash", para...)
	}

	c.Stdout = os.Stdout
	c.Stderr = os.Stderr

	// 不弹出黑色命令行窗口
	c.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}

	err := c.Start()
	return err
}

// 同步执行命令
func SyncCMD(params []string) error {
	var c *exec.Cmd
	switch runtime.GOOS {
	case "darwin":
	case "windows":
		para := append([]string{"/C"}, params[0:]...)
		c = exec.Command("cmd", para...)
	case "linux":
		para := append([]string{"-c"}, params[0:]...)
		c = exec.Command("bash", para...)
	}

	c.Stdout = os.Stdout
	c.Stderr = os.Stderr

	// 不弹出黑色命令行窗口
	c.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}

	err := c.Run()
	return err
}
