const chalk = require('chalk')

const success = (str) => console.log(chalk.green(str))
const fail = (str) => console.log(chalk.red(str))
const info = (str) => console.log(chalk.blue(str))

module.exports = {
	success,
	fail,
	info,
}
