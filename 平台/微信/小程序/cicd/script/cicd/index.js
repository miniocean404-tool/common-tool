#!/usr/bin/env node

const path = require("path");
const WxCi = require("./wx-ci");
const fsWebhook = require("./fshook/fs-webhook");
const { getGitInfo, getOtherInfo } = require("./info");

async function main() {
  // 读取配置文件，合并配置
  const config = require(path.resolve(`${process.cwd()}`, "wxci.config.js"));

  const {
    appid,
    type,
    projectPath,
    privateKeyPath,
    ignore,
    version,
    robot,
    setting,

    FsWebhookUrl,
    versionType = "体验版",
  } = config;

  // 获取参数信息
  const gitInfo = getGitInfo();
  const otherInfo = getOtherInfo(versionType);

  // 上传/预览小程序
  const wxCi = new WxCi({
    // outDir,
    // qrcodeFormat,
  });
  wxCi.createProject(appid, type, projectPath, privateKeyPath, ignore);
  await wxCi.upload({ version, robot, setting, desc: gitInfo.message });

  // 发送飞书提醒
  const webhook = new fsWebhook({
    FsWebhookUrl,
    versionType,

    ...otherInfo,
    ...gitInfo,
  });
  await webhook.send();
}

main().then();
