// wx-ci.js
const path = require('path')
const fs = require('fs')
const ci = require('miniprogram-ci')
const { execSync } = require('child_process')
const { fail, info, success } = require('./util')

class WxCi {
	constructor() {}

	createProject(appid, type, projectPath, privateKeyPath) {
		// 校验密钥
		if (!fs.existsSync(privateKeyPath)) {
			fail(`${privateKeyPath} 密钥文件不存在`)
			process.exit(1)
		}

		this.project = new ci.Project({ appid, type, projectPath, privateKeyPath })
	}

	async upload(version, robot) {
		info('正在上传...')

		try {
			info('上传体验版...')

			const desc = execSync('git log --pretty=format:%s HEAD -1', { cwd: process.cwd() }).toString().trim()
			await ci.upload({ project: this.project, version, desc, robot })

			success('上传成功')
		} catch (error) {
			fail(`上传失败: ${error}`)
			process.exit(1)
		}
	}

	createQRCode() {}
}

module.exports = WxCi
