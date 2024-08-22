package common

import (
	"fmt"
	"os"

	"github.com/olekukonko/tablewriter"
)

func PrintTable(header []string, colum [][]string) {
	table := tablewriter.NewWriter(os.Stdout)
	table.SetAutoWrapText(false)

	table.SetHeader(header)

	// table.Append()
	table.AppendBulk(colum)

	fmt.Print("\x1B[34m")
	table.Render()
	fmt.Print("\u001B[0m")
}
