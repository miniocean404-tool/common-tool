const { format } = require("winston");

const WINSTON_LOG_DIR = "log";

const template = (info) => {
  const { message, level, label, timestamp } = info;
  const msg = typeof message === "string" ? message : JSON.stringify(message);
  return `[${level}] (${label}) ${[timestamp]} message -> ${msg}`;
};

const globalFLog = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:SSS" }),
  format.json(),
  format.label({ label: `${[process.env.NODE_ENV]}` }),
  format.printf(template),
  // format.align(),
  // format.prettyPrint(),
);

const consoleReF = format.combine(
  format.colorize(), // 开启控制台颜色展示
  format.timestamp({ format: "MM-DD HH:mm:ss" }),
  format.json(),
  format.label({ label: `${[process.env.NODE_ENV]}` }),
  format.printf(template),
);

module.exports = {
  globalFLog,
  consoleReF,
  WINSTON_LOG_DIR,
};
