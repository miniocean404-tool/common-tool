const logLevel = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const logColor = {
  error: "red",
  warn: "yellow",
  info: "blue whiteBG",
  http: "green",
  verbose: "green",
  debug: "green",
  silly: "green",
};

module.exports = {
  logLevel,
  logColor,
};
