package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra/doc"
)

func GenDocs() {
	if err := doc.GenMarkdownTree(rootCmd, "./docs/md"); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
