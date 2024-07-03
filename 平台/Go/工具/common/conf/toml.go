package conf

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/BurntSushi/toml"
)

func ReadToml(path string, v any) any {
	// 打开TOML文件
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// 解析TOML文件
	_, err = toml.NewDecoder(file).Decode(v)
	if err != nil {
		panic(err)
	}

	return v
}

func ReadJson(path string, v any) any {
	// 方法 1
	// 读取JSON文件
	// file, _ := os.ReadFile("./config/activity.json")

	// 解析JSON文件到结构体实例中
	// struct 为 type Body []struct {} 类型 那么 data := map[string]Body
	// struct 为 type Body struct {}  或者 那么 data := map[string][]Body
	// _ = json.Unmarshal(file, &data)

	f, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
		return nil
	}
	defer f.Close()

	decoder := json.NewDecoder(f)
	err = decoder.Decode(v)

	if err != nil {
		fmt.Println(err)
		return nil
	}

	return v
}
