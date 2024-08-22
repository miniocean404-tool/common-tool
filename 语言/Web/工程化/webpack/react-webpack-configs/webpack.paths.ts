import path from "path";

const rootPath = path.join(__dirname, "../");

const srcPath = path.join(rootPath, "src");

const distPath = path.join(rootPath, "dist");
const buildPath = path.join(rootPath, "build");
const publicPath = path.join(rootPath, "public");

const packagePath = path.join(rootPath, "package.json");
const nodeModulesPath = path.join(rootPath, "node_modules");
const htmlPath = path.join(publicPath, "index.html");

export default {
  rootPath,
  srcPath,

  distPath,
  buildPath,
  publicPath,

  packagePath,
  nodeModulesPath,
  htmlPath,
};
