// scripts/release.mjs

import { createRequire } from "module";
import { execSync } from "child_process";
import fs from "fs";

import updatelog from "./updatelog.mjs";

const require = createRequire(import.meta.url);

async function release() {
  const flag = process.argv[2] ?? "patch";
  const pkg = require("../package.json");
  const tauriPkg = require("../src-tauri/tauri.conf.json");

  let [major, minor, patch] = pkg.version.split(".").map(Number);

  if (flag === "major") {
    // 主版本
    major += 1;
    minor = 0;
    patch = 0;
  } else if (flag === "minor") {
    // 次版本
    minor += 1;
    patch = 0;
  } else if (flag === "patch") {
    // 补丁版本
    patch += 1;
  } else {
    console.log(`无效的版本标志 "${flag}"`);
    process.exit(1);
  }
  const nextVersion = `${major}.${minor}.${patch}`;

  const nextTag = `v${nextVersion}`;
  // await updatelog(nextTag, "release");

  pkg.version = nextVersion;
  tauriPkg.package.version = nextVersion;

  // 将新版本写入 package.json 文件
  fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));
  fs.writeFileSync("./src-tauri/tauri.conf.json", JSON.stringify(tauriPkg, null, 2));

  const gitMessage = execSync("git log --pretty=format:%s HEAD -1", { encoding: "utf-8" });
  const gitBranch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" });
  const gitHash = execSync("git rev-parse --verify --short HEAD", { encoding: "utf-8" });

  // 提交修改的文件，打 tag 标签（tag 标签是为了触发 github action 工作流）并推送到远程
  execSync("git add ./package.json ./UPDATE_LOG.md");
  execSync("git add .");
  execSync(`git commit -m "version: v${nextVersion}"`);
  execSync(`git tag -a v${nextVersion} -m "hash:${gitHash} branch:${gitBranch} message:${gitMessage}"`);
  execSync(`git push`);
  execSync(`git push origin v${nextVersion}`);
  console.log(`发布成功...`);
}

release().catch(console.error);
