package typing

// 可选参数
type (
	Option func(opt *options)

	options struct {
		env bool
	}
)

// UseEnv 自定义配置以使用环境变量。
func UseEnv() Option {
	return func(opt *options) {
		opt.env = true
	}
}
