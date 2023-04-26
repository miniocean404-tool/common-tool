const { execSync } = require('child_process')
const HOSTNAME = require('os').hostname()

const getGitInfo = () => {
	try {
		const options = { cwd: process.cwd() }

		// git rev-parse --verify --short HEAD
		// --short 打印较短的 hash 值
		// --verify 验证指定的对象是否是有效的git对象.
		// --git-dir 用于显示目录的abs /相对路径.git

		const branchName = execSync('git rev-parse --abbrev-ref HEAD', options).toString().trim()
		const hash = execSync('git rev-parse --verify --short HEAD', options).toString().trim()
		const message = execSync('git log --pretty=format:%s HEAD -1', options).toString().trim()

		return {
			branchName,
			hash,
			message,
		}
	} catch (error) {
		console.error('获取git日志失败', error)
	}
}

const getOtherInfo = (versionType) => {
	const wechatPart = `**[微信${versionType}](https://) 小程序构建完成**`
	const machine = `构建机器：${HOSTNAME}`

	return {
		wechatPart,
		machine,
	}
}

exports.getGitInfo = getGitInfo
exports.getOtherInfo = getOtherInfo
