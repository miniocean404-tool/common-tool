const { format } = require("winston");

const WINSTON_LOG_DIR = "log";

const template = (info) =>
  `[${info.level}] (${process.env.NODE_ENV}) ${[info["timestamp"]]} 信息: ${
    info.message
  }`;

const globalFLog = format.combine(
  format.json(),
  format.label({ label: `运行环境:${[process.env.NODE_ENV]}` }),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:SSS" }),
  format.printf(template),
  // format.align(),
  // format.prettyPrint(),
);

const consoleReF = format.combine(
  format.colorize(), // 开启控制台颜色展示
  format.timestamp({ format: "MM-DD HH:mm:ss" }),
  format.printf(template),
);

module.exports = {
  globalFLog,
  consoleReF,
  WINSTON_LOG_DIR,
};
