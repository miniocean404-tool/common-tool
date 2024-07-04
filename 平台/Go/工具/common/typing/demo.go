package typing

import (
	"fmt"
	"reflect"
)

type CustomType func(mode string)

func IsTransformTypeReflect(cur any, target any) bool {
	optType := reflect.TypeOf(cur)
	targetType := reflect.TypeOf(target)

	// Convertible 判断参数是否可以被转换
	return optType.ConvertibleTo(targetType)
}

func GetTypeS(params interface{}) string {
	optType := reflect.TypeOf(params)
	return optType.String()
}

// opt.(xx) 类型强转
func asType(opts ...any) {
	for _, opt := range opts {
		switch v := opt.(type) {
		case string:
			fmt.Println("String:", v)
		case int:
			fmt.Println("Int:", v)
		case CustomType:
			fmt.Println("CustomType:", v)
		default:
			fmt.Printf("类型为: %T, 值为: %v\n", v, v)
		}
	}
}

func asType2(opt any) {
	t := reflect.TypeOf(opt)
	if t.Kind() == reflect.Func {
		opt.(func())()
	}
}

type TestOption func(*TestOptions)

type TestOptions struct {
	Param1 int
	Param2 string
}

// 使用：
// exampleFunction(WithParam1(42))
//
//	func WithParam1(value int) Option {
//	    return func(o *Options) {
//	        o.Param1 = value
//	    }
//	}
func OptionalParams(options ...TestOption) {
	var opts TestOptions

	// 设置默认选项
	// opts := TestOptions{
	// 	Param1: 0,
	// 	Param2: "",
	// }

	// 应用所有选项
	for _, option := range options {
		option(&opts)
	}

	// 在函数内部使用 opts 的值
	fmt.Println(opts.Param1)
	fmt.Println(opts.Param2)
}

func Optional(opts ...any) {

}
