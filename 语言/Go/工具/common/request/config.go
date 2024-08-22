package request

type Request struct {
	TestRequest bool   `mapstructure:"test_request"`
	UserAgent   string `mapstructure:"user_agent"`
	TimeOutSec  int    `mapstructure:"time_out_sec"`
	MaxTries    int    `mapstructure:"max_tries"`
	IntervalSec int    `mapstructure:"interval_sec"`
}
