module.exports = {
	useTabs: true, //使用tab缩进，默认false
	tabWidth: 2, //tab缩进大小,默认为2
	semi: true, //使用分号,默认true
	printWidth: 120, //超过最大值换行
	proseWrap: 'never',
	trailingComma: 'all', //确保对象的最后一个属性后会有一个逗号
	singleQuote: true, //使用单引号,默认false(在jsx中配置无效,默认都是双引号)
	bracketSpacing: true, //对象中的空格默认true
	endOfLine: 'auto', //结尾是\n\r\n\rauto
	htmlWhitespaceSensitivity: 'ignore',
	TrailingCooma: 'none', //行尾逗号,默认none,可选none|es5|alles5包括es5中的数组、对象all包括函数对象等所有可选
	arrowParens: 'always', //箭头函数参数括号默认avoid可选avoid|alwaysavoid能省略括号的时候就省略例如x=>xalways总是有括号
	jsxSingleQuote: false, //在jsx中使用单引号代替双引号,
	jsxBracketSameLine: true, //JSX标签闭合位置默认false
	//false:<div
	//className=""
	//style={{}}
	//>
	//true:<div
	//className=""
	//style={{}}>
	eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
	stylelintIntegration: false, //不让prettier使用stylelint的代码格式进行校验
	tslintIntegration: false, //不让prettier使用tslint的代码格式进行校验
	overrides: [
		{
			files: '.prettierrc',
			options: {
				parser: 'json',
			},
		},
	],
};
