const prettier = require("prettier");
const path = require("path");

async function format(text, type) {
  const config = require("../.prettierrc.js");
  return await prettier.format(text, { parser: type, ...config });
}

module.exports = {
  format,
};
