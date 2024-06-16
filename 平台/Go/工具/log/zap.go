// 文章：https://blog.csdn.net/weixin_52000204/article/details/126651319
// 文章颜色：https://blog.csdn.net/cczj0/article/details/128978811

// 使用 log.InitLogger(配置)

package log

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
	"ms_template_go/src/load/config"
	"os"
	"runtime"
	"time"
)

var logger *zap.Logger

// parseTime 进行时间格式处理
func parseTime(layout string) zapcore.TimeEncoder {
	return func(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
		type appendTimeEncoder interface {
			AppendTimeLayout(time.Time, string)
		}
		if enc, ok := enc.(appendTimeEncoder); ok {
			enc.AppendTimeLayout(t, layout)
			return
		}
		enc.AppendString(t.Format(layout))
	}
}

// 负责设置 encoding 的日志格式
func getEncoder(color bool) zapcore.EncoderConfig {
	// 获取一个指定的的 EncoderConfig，进行自定义
	encodeConfig := zap.NewProductionEncoderConfig()

	// 设置每个日志条目使用的键。如果有任何键为空，则省略该条目的部分。
	// 序列化时间。eg: 2022-09-01T19:11:35.921+0800
	encodeConfig.EncodeTime = parseTime("2006-01-02 15:04:05.000")
	// "time":"2022-09-01T19:11:35.921+0800"
	encodeConfig.TimeKey = "time"

	if color {
		// 将 Level 序列化为全大写字符串 并 携带颜色。例如，将info level序列化为 INFO
		encodeConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	} else {
		encodeConfig.EncodeLevel = zapcore.CapitalLevelEncoder
	}

	// 以 package/file:行 的格式 序列化调用程序，从完整路径中删除除最后一个目录外的所有目录。
	encodeConfig.EncodeCaller = zapcore.ShortCallerEncoder

	// json 格式：zapcore.NewJSONEncoder(encodeConfig)
	return encodeConfig
}

// 负责日志写入的位置
func getLogWriter(filename string, maxsize, maxBackup, maxAge int) zapcore.WriteSyncer {
	lumberJackLogger := &lumberjack.Logger{
		Filename:   filename,  // 文件位置
		MaxSize:    maxsize,   // 进行切割之前,日志文件的最大大小(MB为单位)
		MaxAge:     maxAge,    // 保留旧文件的最大天数
		MaxBackups: maxBackup, // 保留旧文件的最大个数
		Compress:   false,     // 是否压缩/归档旧文件
	}
	// AddSync 将 io.Writer 转换为 WriteSyncer。
	// 它试图变得智能：如果 io.Writer 的具体类型实现了 WriteSyncer，我们将使用现有的 Sync 方法。
	// 如果没有，我们将添加一个无操作同步。

	file := zapcore.AddSync(lumberJackLogger)

	return zapcore.NewMultiWriteSyncer(file)
}

// InitLogger 初始化Logger
func InitLogger(con config.Logger) {
	// 获取日志写入位置
	writeSyncer := getLogWriter(con.Location+"/"+con.FileName+".log", con.MaxSize, con.MaxBackups, con.MaxAge)

	// 获取日志最低等级，即>=该等级，才会被写入。
	var l = new(zapcore.Level)
	err := l.UnmarshalText([]byte(con.Level))
	if err != nil {
		zap.S().Error(err)
		return
	}

	// 获取日志编码格式
	consoleEn := zapcore.NewConsoleEncoder(getEncoder(con.LevelWithColor && runtime.GOOS != "linux"))
	consoleJSON := zapcore.NewJSONEncoder(getEncoder(false))
	core := zapcore.NewTee(
		zapcore.NewCore(consoleJSON, writeSyncer, l),
		zapcore.NewCore(consoleEn, zapcore.Lock(os.Stdout), l),
	)

	// 创建一个将日志写入 WriteSyncer 的核心。
	logger = zap.New(core, zap.WithCaller(con.Caller))

	// 替换zap包中全局的logger实例，后续在其他包中只需使用zap.L()调用即可
	zap.ReplaceGlobals(logger)
	return
}
