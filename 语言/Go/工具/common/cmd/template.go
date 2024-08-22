package cmd

func setHelp() {
	// 我们可以使用 rootCmd.SetHelpCommand 来控制 help 命令输出，使用 rootCmd.SetHelpFunc 来控制 -h/--help 输出
	// rootCmd.SetHelpCommand(&cobra.Command{
	// 	Use:    "help",
	// 	Short:  "脚本帮助 flag",
	// 	Hidden: true,
	// 	Run: func(cmd *cobra.Command, args []string) {
	// 		fmt.Println("Custom help command")
	// 	},
	// })

	// 使用 help 命令查看帮助信息输出结果是 rootCmd.SetHelpCommand 中 Run 函数的执行输出
	// 使用 -h 查看帮助信息输出结果是 rootCmd.SetHelpFunc 函数的执行输出，strings 代表的是命令行标志和参数列表
	// rootCmd.SetHelpFunc(func(command *cobra.Command, strings []string) {
	// 	fmt.Println(strings)
	// })

	// SetHelpTemplate 用来设置 help 模板信息
	// 	rootCmd.SetHelpTemplate(`
	// 欢迎使用我的脚本:
	// 用法:
	// 	{{.UseLine}}
	// 简短描述:
	// 	{{.Short}}
	// 命令:
	// {{- range .Commands}}
	// 	{{.Name}}: {{.Short}}
	// {{- end}}
	// 选项：
	// {{.LocalFlags.FlagUsages | trimTrailingWhitespaces}}
	// 	`)

}

// 这个输出格式默认与 help 信息一样，我们也可以进行自定义
// 首先程序会报错 Error: unknown flag: --demo，报错后会显示 Usage 信息。
func setUsage() {
	// rootCmd.SetUsageFunc(customUsage)
	// cmd.SetUsageTemplate(s string)
}

// func customUsage(cmd *cobra.Command) error {
// 	_, _ = fmt.Fprintf(os.Stderr, "Usage: %s [OPTIONS]\n", cmd.Name())
// 	_, _ = fmt.Fprintln(os.Stderr, "我的 cli 的使用方式")
// 	_, _ = fmt.Fprintln(os.Stderr, "")
// 	_, _ = fmt.Fprintln(os.Stderr, "选项:")
// 	cmd.Flags().VisitAll(func(flag *pflag.Flag) {
// 		_, _ = fmt.Fprintf(os.Stderr, "  --%s = %s\n", flag.Name, flag.Usage)
// 	})
// 	return nil
// }
