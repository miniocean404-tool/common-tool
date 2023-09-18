// commonjs 适用于 11.0.4 版本
const globby = require("globby");

const readDir = async () => {
  const basePath = "";

  const dirs = await globby([`./`], {
    cwd: basePath,
    absolute: true, // 返回绝对路径
    objectMode: false, // 返回描述条目的对象（而不是字符串）

    caseSensitiveMatch: true, // 是否区分大小写
    onlyFiles: true, // 是否只返回文件
    onlyDirectories: false, // 是否只返回目录

    stats: false, // 是否返回 stat 而不是 lstat
    gitignore: false,
    dot: false, // 是否匹配 . 开头的文件
    followSymbolicLinks: true, // 是否遍历符号链接目录的后代**
    ignore: [
      ".nuxt",
      "node_modules",
      "idea",
      "nuxt.config.js",
      "package-lock.json",
      "Dockerfile",
      "utils",
      "apis",
      "constant",
      "bak",
      // 某个文件需要忽略全路径
      "pages/recommend-rights.vue",
    ],
    suppressErrors: false, // 默认情况下，此包仅抑制ENOENT错误。设置为true以抑制任何错误
    markDirectories: true, // 用最后一个斜杠标记目录路径

    // 额外的条件
    // 有了 expandDirectories 后 globby 参数一就不需要 **/* 而是用 expandDirectories 进行匹配
    expandDirectories: {
      // files: ["*", "*.jpg"],
      extensions: ["vue", "js", "json", "html"],
    },
  });

  return dirs;
};
