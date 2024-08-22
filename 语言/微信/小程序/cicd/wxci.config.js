const path = require('path')

module.exports = {
  version: '1.0.0',
  appid: '', // 微信小程序appid
  ignore: [''],
  setting: { es6: true },
  projectPath: path.resolve(process.cwd(), 'dist'),
  privateKeyPath: path.resolve(process.cwd(), '', ''), // 第一步的密钥地址
  qrcodeImageUrl: '', // 微信体验版二维码图片网络地址，因为体验版图片地址是固定的，建议转存到 cdn 上
  FsWebhookUrl: '', // 第二步webhook的url
}
