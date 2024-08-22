package conf

import (
	"fmt"
	"go-script/src/utils/common/typing"

	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
)

func Load(file string, config any, opts ...typing.Option) {
	viper.SetConfigFile(file)

	// viper.AddConfigPath(dir) // 查找路径
	// viper.SetConfigFile(filename) // 配置文件名，不需要后缀
	// viper.SetConfigType(format) // 设置配置文件格式

	// 自动读取环境变量
	viper.AutomaticEnv()

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		panic(fmt.Errorf("配置文件未找到, err: %v 文件路径：%v", err, viper.ConfigFileUsed()))

		// if _, ok := err.(viper.ConfigFileNotFoundError); ok {
		// } else {
		// }
	}

	// 将配置文件内容写入到Conf结构体
	if err := viper.Unmarshal(&config); err != nil {
		panic(fmt.Errorf("解析数据到 Conf 错误, err: %v", err))
	}

	// 监听配置文件
	viper.WatchConfig()

	// 监听是否更改配置文件
	viper.OnConfigChange(func(e fsnotify.Event) {
		fmt.Printf("%s 配置文件被修改了\n", e.Name)
		err := viper.Unmarshal(&config)

		if err != nil {
			panic(fmt.Errorf("%s配置文件修改，报错啦，err:%v", e.Name, err))
		}
	})
}
