const fs = require("fs");

const createDir = () => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

module.exports = {
  createDir,
};
