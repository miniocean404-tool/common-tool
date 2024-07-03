// https://blog.csdn.net/Gherbirthday0916/article/details/135336124

package cmd

import (
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	// 应用名称
	Use: "cobra-cli",
	// 应用简短描述
	Short: "自定义命令",
	// 应用详细描述
	Long: `自定义命令模板`,
}

func init() {
	// // 配置文件
	// rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "描述文字")
	// // 作者信息
	// rootCmd.PersistentFlags().StringP("author", "a", "YOUR NAME", "author name for copyright attribution")
	// // 许可证信息
	// rootCmd.PersistentFlags().StringVarP(&userLicense, "license", "l", "", "name of license for the project")
	// // 使用Viper进行配置
	// rootCmd.PersistentFlags().Bool("viper", true, "use Viper for configuration")
	// // 将命令行标志绑定到 Viper 配置库中的相应参数
	// err := viper.BindPFlag("author", rootCmd.PersistentFlags().Lookup("author"))
	// if err != nil {
	// 	return
	// }
	// err2 := viper.BindPFlag("useViper", rootCmd.PersistentFlags().Lookup("viper"))
	// if err2 != nil {
	// 	return
	// }
	// 设置默认配置值
	// viper.SetDefault("author", "NAME HERE <EMAIL ADDRESS>")
	// viper.SetDefault("license", "apache")

	// 用于添加子命令
	// rootCmd.AddCommand(addCmd)
	// rootCmd.AddCommand(initCmd)
}

func Execute() error {
	return rootCmd.Execute()
}

func Init() {
	// 将传递的函数设置为在调用每个命令的Execute方法时运行。
	cobra.OnInitialize(func() {

	})
}
