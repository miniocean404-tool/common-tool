package conf

import "github.com/spf13/viper"

var (
	Devlopment = "dev"
	Testing    = "test"
	Production = "prod"
)

func IsDevlopment() bool {
	return viper.GetString("mode") == Devlopment
}

func IsTesting() bool {
	return viper.GetString("mode") == Devlopment
}

func IsProduction() bool {
	return viper.GetString("mode") == Devlopment
}
