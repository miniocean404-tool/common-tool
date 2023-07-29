const { transports, format } = require("winston");
const { WINSTON_LOG_DIR, consoleReF } = require("./format");

const { Console, DailyRotateFile, File } = transports;

const consoleT = new Console({
  level: "info",
  format: consoleReF,
});

const infoFileT = new DailyRotateFile({
  // handleExceptions:true //处理异常
  // handleRejections:true //处理未经批准的拒绝承诺
  filename: `${WINSTON_LOG_DIR}/info/%DATE%.log`,
  level: "info",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const errorFileT = new DailyRotateFile({
  filename: `${WINSTON_LOG_DIR}/err/%DATE%.log`,
  level: "error",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const exceptionFileT = new File({
  filename: `${WINSTON_LOG_DIR}/other/exceptions.log`,
});

const rejectFileT = new File({
  filename: `${WINSTON_LOG_DIR}/other/reject.log`,
});

module.exports = {
  consoleT,
  infoFileT,
  errorFileT,
  exceptionFileT,
  rejectFileT,
};
