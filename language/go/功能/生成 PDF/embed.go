package pdf

import (
	"embed"
	"encoding/base64"
	"fmt"
	"log"
	"mime"
	"path"
)

//go:embed embed/header.html
var headerEmbed embed.FS

//go:embed embed/footer.html
var footerEmbed embed.FS

//go:embed embed/logo.png
var logoEmbed embed.FS

func Png2Base64() string {
	filePath := `embed/logo.png`
	logo, err := logoEmbed.ReadFile(filePath)
	if err != nil {
		log.Fatalf("error %#v", err)
	}

	ext := path.Ext(filePath)
	mimeType := mime.TypeByExtension(ext)
	base64Prefix := fmt.Sprintf(`data:%s;base64,`, mimeType)

	return base64Prefix + base64.StdEncoding.EncodeToString(logo)
}

func GetHeaderFooterHTML() (string, string) {
	header, err := headerEmbed.ReadFile("embed/header.html")
	if err != nil {
		log.Fatalln(err)
	}

	footer, err1 := footerEmbed.ReadFile("embed/footer.html")
	if err1 != nil {
		log.Fatalln(err1)
	}

	return string(header), string(footer)
}
