// https://juejin.cn/post/7231197051203256379?searchId=20240703151053C05BB883D7FAB21092AF
// https://blog.csdn.net/Gherbirthday0916/article/details/135336124

package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

type LoadOption func(*LoadOptions)

type LoadOptions struct {
	Init CMDRun
}

type CMDRun = func(CMDRunInitMode)

type CMDRunInitMode = func(mode string)

var rootCmd = &cobra.Command{
	// 命令名称
	Use: "script",
	// 应用简短描述
	Short: "自定义命令",
	// 应用详细描述
	Long: `自定义命令模板`,
	// 默认情况下，Cobra 仅解析目标命令上的本地标志，忽略父命令上的本地标志。
	// 通过在父命令上启用 Command.TraverseChildren 属性，Cobra 将在执行目标命令之前解析每个命令的本地标志
	// 例：xxx -s value1 print -f value2 ,启用标志后会执行 print -f 并且也会解析父命令的 -s
	TraverseChildren: true,
	// 属性类型为一个函数：func(cmd *Command, args []string) error，可以用来验证参数，可以自定义，也可以使用内置的
	// ArbitraryArgs：该命令将接受任意参数。
	Args: cobra.ArbitraryArgs,
	// 是否隐藏这个命令
	Hidden: false,

	// 在 PreRun 函数执行之前执行，对此命令的子命令同样生效。
	PersistentPreRun: func(cmd *cobra.Command, args []string) {},
	// 在 Run 函数执行之前执行。
	PreRun: func(cmd *cobra.Command, args []string) {},
	// 当执行命令时会调用此函数
	Run: func(cmd *cobra.Command, args []string) {
		// fmt.Println("命令执行了")
	},
	// 在 Run 函数执行之后执行。
	PostRun: func(cmd *cobra.Command, args []string) {},
	// 在 PostRun 函数执行之后执行，对此命令的子命令同样生效
	PersistentPostRun: func(cmd *cobra.Command, args []string) {},

	// 以上几个函数都有对应的 <Hooks>E 版本，E 表示 Error，即函数执行出错将会返回 Error，执行顺序不变：

	// 是否关闭未知命令建议
	DisableSuggestions: false,
	// SuggestionsMinimumDistance 是一个正整数，表示输错的命令与正确的命令最多有几个不匹配的字符（最小距离），才会给出建议。如当值为 1 时，用户输入 hugo versiox 会给出建议，而如果用户输入 hugo versixx 时，则不会给出建议
	SuggestionsMinimumDistance: 1,
}

func Load(opts ...LoadOption) {
	cobra.OnInitialize(func() {
		mode := rootCmd.PersistentFlags().Lookup("mode").Value.String()

		o := LoadOptions{
			Init: func(init CMDRunInitMode) {
				init(mode)
			},
		}

		for _, opt := range opts {
			opt(&o)
		}
	})

	initCmd()

	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}

}

// PersistentFlags 表示当前命令及其子命令所有命令可用的标志
// Flags 表示当前命令可用的标志
// MarkFlagRequired("region") 表示必须使用的标志
func initCmd() {
	setUsage()
	setHelp()

	// 可使用的方法 Bool StringVar StringVarP
	// xxxP代表可以使用短符号的标志 --mode 可为 -m
	rootCmd.PersistentFlags().StringP("mode", "m", "dev", "设置当前程序的运行环境")

	// 将命令行标志绑定到 Viper 配置库中的相应参数
	// 可以使用 viper.Get("xx") 获取
	err := viper.BindPFlag("mode", rootCmd.PersistentFlags().Lookup("mode"))
	if err != nil {
		panic(fmt.Errorf("viper.BindPFlag 错误 %#v", err))
	}
	// viper 设置默认配置值
	// viper.SetDefault("mode", "dev")

	// 用于添加子命令
	// rootCmd.AddCommand(addCmd)
}
