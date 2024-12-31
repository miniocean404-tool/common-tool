const getTokenPath = "https://www.pgyer.com/apiv2/app/getCOSToken"
const getAppInfoPath = "https://www.pgyer.com/apiv2/app/buildInfo"
const _apiKey = "46d4d6729240877a56c4526f0514593d" // https://www.pgyer.com/account/api
const buildType = "android" // android || ios

const fs = require("fs")
const axios = require("axios")

// 发布应用
async function publish({ app, apiKey = _apiKey, buildType }) {
  const token = await getToken(apiKey, buildType)

  const file = fs.createReadStream(app)
  // const file = Buffer.from(fs.readFileSync(app))

  // from 表单上传 文件必须放在 ... 结构下面
  // Buffer.from 和 fs.createReadStream 都可以上传
  const form = axios.toFormData({
    ...token.params,
    file: file,
  })

  const up = await axios.postForm(token.endpoint, form)

  if (up.status !== 204) return console.log(">>>>> 蒲公英上传失败")

  // 延迟一段时间后获取应用信息
  setTimeout(async () => await getAppInfo(apiKey, token), 1000)
}

// 获取蒲公英 token
async function getToken(apiKey, buildType) {
  const res = await axios.post(getTokenPath, null, {
    params: {
      _api_key: apiKey,
      buildType: buildType,
    },
  })

  return res.data.data
}

// 获取应用信息
async function getAppInfo(apiKey, token) {
  const res = await axios.get(getAppInfoPath, {
    params: {
      _api_key: apiKey,
      buildKey: token.key,
    },
  })

  const json = res.data

  // 应用正在发布中，间隔 3 秒重新获取
  if (json.code == 1247) {
    console.log(">>>>> 应用正在发布中，间隔 1 秒重新获取发布信息")
    return setTimeout(async () => await getAppInfo(token), 1000)
  }

  const appName = json.data.buildName
  const appVersion = json.data.buildVersion
  const appUrl = json.data.buildShortcutUrl
  const updateTime = json.data.buildUpdated

  if (appName) {
    console.log(`${appName} 版本更新（${appVersion}）`)
    console.log(`下载地址：https://www.pgyer.com/${appUrl}`)
    console.log("更新时间：", updateTime)
  }
}

module.exports = {
  publish,
}
