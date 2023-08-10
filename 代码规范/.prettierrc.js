module.exports = {
  useTabs: false, // 使用tab缩进，默认false
  tabWidth: 2, // tab缩进大小,默认为2
  semi: false, // 使用分号, 默认true
  printWidth: 120, // 超过最大值换行
  singleQuote: false, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
  bracketSpacing: true, //对象中的空格 默认true
  endOfLine: 'lf', //结尾是 \n \r \n\r 值：auto || lf
  htmlWhitespaceSensitivity: 'ignore', // ignore || css
  TrailingCooma: 'none', // 行尾逗号,默认none,可选 none|es5|all es5 包括es5中的数组、对象 all 包括函数对象等所有可选
  arrowParens: 'always', // 箭头函数参数括号 默认avoid 可选 avoid| always avoid 能省略括号的时候就省略 例如x => x always 总是有括号
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号,
  eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
  stylelintIntegration: false, //不让prettier使用stylelint的代码格式进行校验
  tslintIntegration: false, // 不让prettier使用tslint的代码格式进行校验

  quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
  trailingComma: 'all', // 末尾需要有逗号
  jsxBracketSameLine: false, // jsx 标签的反尖括号需要换行
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  rangeEnd: Infinity,
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  proseWrap: 'preserve', // 使用默认的折行标准
  vueIndentScriptAndStyle: false, // vue 文件中的 script 和 style 内不用缩进
  embeddedLanguageFormatting: 'auto', // 格式化嵌入的内容
  singleAttributePerLine: false, // html, vue, jsx 中每个属性占一行
}
