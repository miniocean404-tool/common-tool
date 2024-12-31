package common

import (
	"embed"
	"fmt"
)

//go:embed embed.go
var content embed.FS

// 嵌入文件：必须有 go:embed
func EmbedFile() {
	b, err := content.ReadFile("embed.go")
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}

	fmt.Println(string(b))
}
