// https://blog.csdn.net/xiexingshishu/article/details/117196560
// 可自定义传输类型（可自己写类实现包的方法）
// 字体样式：bold, dim,italic, underline, inverse, hidden, strikethrough
// 字体背景颜色：black,red,green,yellow,blue, magenta,cyan,white,gray,grey
// 背景颜色：blackBG,redBG,greenBG,yellowBG,blueBG,magentaBG,cyanBG,whiteBG

const { createLogger, addColors } = require("winston");
require("winston-daily-rotate-file");

const { logColor, logLevel } = require("./color");
const { globalFLog } = require("./format");
const {
  consoleT,
  infoFileT,
  errorFileT,
  exceptionFileT,
  rejectFileT,
} = require("./type");

addColors(logColor);

// 可以创建多个日志打印器
const logger = createLogger({
  level: "info",
  levels: logLevel,
  format: globalFLog,
  silent: false, // 是否禁用所有日志
  transports: [infoFileT, errorFileT],
  exitOnError: false, //异常时候是否退出 false 退出 默认为 true
  exceptionHandlers: [exceptionFileT],
  rejectionHandlers: [rejectFileT], //处理未经批准的拒绝承诺
});

if (process.env.NODE_ENV !== "production") logger.add(consoleT);

module.exports = {
  logger,
};
