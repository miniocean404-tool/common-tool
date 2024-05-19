const fs = require("fs")
const { execSync } = require("child_process")
const yaml = require("yaml")
const dayjs = require("dayjs")
const { publish } = require("./publish")

const BUILD_CONFIG = {
  android: {
    type: "android",
    ext: "apk",
    buildAppName: "app-release.apk",
    command: "flutter build apk --verbose",
    outputDir: "/build/app/outputs/flutter-apk/",
    isUpload: true,
  },
  ios: {
    type: "ios",
    ext: "ipa",
    buildAppName: "应用名称.ipa",
    command: `flutter build ipa --target=${process.cwd()}/build/ios/lib/main.dart --verbose`,
    outputDir: "/build/ios/ipa/",
    isUpload: true,
  },
}

async function execBuild() {
  await build(BUILD_CONFIG.android)
  await build(BUILD_CONFIG.ios)
}

async function build(config) {
  const { type, ext, buildAppName, command, outputDir, isUpload } = config
  const cwd = process.cwd()

  // Print project directory
  console.log(`项目目录：${cwd} 开始编译`)

  try {
    await execSync(command, {
      encoding: "utf-8",
      cwd,
    })
  } catch (e) {
    console.log(`${type} 打包失败，请查看日志:\n${e.message}}`)
    return
  }

  // Start renaming
  const file = fs.readFileSync(`${cwd}/pubspec.yaml`, "utf8")
  const parse = yaml.parse(file)

  const version = parse.version.replace("+", "_")
  const appName = parse.name

  // APK output directory
  const apkDirectory = `${cwd}${outputDir}`
  //   process.chdir(apkDirectory) // 切换目录
  const timeStr = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")

  const resultNameList = [appName, version, timeStr].filter(Boolean)
  const resultAppName = `${resultNameList.join("_")}.${ext}`
  const appPath = `${apkDirectory}${resultAppName}`

  // Rename APK file
  fs.renameSync(`${apkDirectory}${buildAppName}`, appPath)
  console.log(`${type} 打包成功 >>>>> ${appPath}`)

  if (isUpload) {
    publish({ app: appPath, buildType: type })
    fs.unlinkSync(appPath)
  } else {
    // Open the directory
    exec("open " + apkDirectory)
  }
}
