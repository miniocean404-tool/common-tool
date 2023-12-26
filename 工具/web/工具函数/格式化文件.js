const prettier = require("prettier");
const path = require("path");

const formart = async (data) => {
  return await prettier.format(data, {
    filepath: path.join(process.cwd(), ".prettierrc.js"),
    parser: "json",
  });
};

module.exports = {
  formart,
};
