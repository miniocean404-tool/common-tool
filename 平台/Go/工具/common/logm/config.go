package logm

type Logger struct {
	Level          string `mapstructure:"level"`
	FileName       string `mapstructure:"filename"`
	MaxSize        int    `mapstructure:"max_size"`
	MaxAge         int    `mapstructure:"max_age"`
	MaxBackUps     int    `mapstructure:"max_backups"`
	LevelWithColor bool   `mapstructure:"level_with_color"`
	ConsoleOutPut  bool   `mapstructure:"console_out_put"`
	FileOutPut     bool   `mapstructure:"file_out_put"`
	Location       string `mapstructure:"location"`
	MaxBackups     int    `mapstructure:"max_backups"`
	Caller         bool   `mapstructure:"caller"`
}
