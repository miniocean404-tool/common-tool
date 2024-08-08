import path from "path"

// nuxt2 只需要添加 build 下的 transpile 即可处理 esModule
// vue 添加 babel-loader 处理 es 文件
function add_babel(config: any) {
  const esLIbs = ["@svgdotjs"]

  config.module.rules.push({
    test: /\.m?jsx?$/i,
    include: esLIbs.map((lib) => path.resolve(__dirname, "node_modules", lib)),
    use: [
      {
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [["@babel/preset-env"]],
        },
      },
    ],
  })
}
