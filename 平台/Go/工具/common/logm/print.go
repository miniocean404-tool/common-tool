package logm

import "github.com/davecgh/go-spew/spew"

// Pretty 漂亮的打印
func Pretty(prop interface{}) {
	spew.Dump(prop)
}
