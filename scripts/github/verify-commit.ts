// Invoked on the commit-msg git hook by yorkie.

const chalk = require("chalk")
// Yorkie的gitHooks使用process.env.GIT_PARAMS
const msgPath = process.argv[2]
const msg = require("fs").readFileSync(msgPath, "utf-8").trim()

// revert:回滚到上一个版本

// feat:新特性、新功能
// fix:修改bug
// docs:文档修改
// style:代码格式（不影响功能，例如空格、分号等格式修正）
// refactor:代码重构
// perf:优化相关，比如提升性能、体验
// test:修改test测试用例修改
// workflow:工作流修改
// build:编译相关的修改，例如发布版本、对项目构建或者依赖的改动（例如 scopes: webpack、gulp、npm 等）
// ci:持续集成修改
// chore:其他修改, 比如改变构建流程、或者增加依赖库、工具等

const emojiRE = "(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]"
const commitRE = new RegExp(
  `^((${emojiRE})* )?(revert: )?(dev|feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?(.{1,10})?: .{1,50}`,
)
const mergeRe = /^(Merge pull request|Merge branch)/

if (!commitRE.test(msg)) {
  if (!mergeRe.test(msg)) {
    console.log("提交的消息: ", msg)
    console.error(
      ` ${chalk.bgRed.white(" 错误 ")} ${chalk.red(`错误的消息格式`)}\n\n${chalk.red(
        `  自动化校验-提交模板样例:\n\n`,
      )}    ${chalk.green(`feat(compiler): add 'comments' option（冒号后有空格）`)}\n` +
        `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n${chalk.red(
          `  查看文档详情：https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md for more details.\n`,
        )}`,
    )
    process.exit(1)
  }
}
