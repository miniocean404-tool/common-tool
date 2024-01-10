import { Configuration, EnvironmentPlugin } from "webpack";
import paths from "./webpack.paths";
import pkg from "../package.json";

import HtmlWebpackPlugin from "html-webpack-plugin";
import InterpolateHtmlPlugin from "interpolate-html-plugin";
import Dotenv from "dotenv-webpack";

// 在开发环境我们希望css嵌入在style标签里面,方便样式热替换,但打包时我们希望把css单独抽离出来,方便配置缓存策略。
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isDev = process.env.NODE_ENV === "development";

const config: Configuration = {
  context: paths.rootPath,

  // 在webpack5之前做缓存是使用babel-loader缓存解决js的解析结果,cache-loader缓存css等资源的解析结果,还有模块缓存插件hard-source-webpack-plugin,
  // 配置好缓存后第二次打包,通过对文件做哈希对比来验证文件前后是否一致,如果一致则采用上一次的缓存,可以极大地节省时间
  //
  // webpack5 较于 webpack4,新增了持久化缓存、改进缓存算法等优化,通过配置 webpack 持久化缓存,
  // 来缓存生成的 webpack 模块和 chunk,改善下一次打包的构建速度,可提速 90% 左右,配置也简单，修改webpack.base.js
  // 缓存的存储位置在node_modules/.cache/webpack,里面又区分了development和production缓存
  cache: {
    type: "filesystem", // 使用文件缓存
    compression: "gzip",
    version: pkg.version,
    // 编译器闲置时候，将缓存数据都存放在一个文件中
    store: "pack",
  },
  // 是否展示基础日志
  infrastructureLogging: {
    level: "info",
  },
  resolve: {
    // css js 都使用 @ 前缀引入
    alias: {
      "@": paths.srcPath,
    },
    extensions: [".js", ".tsx", ".ts", ".scss", ".css"],

    // 如果用的是 pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块。
    // 查找第三方模块只在本项目的 node_modules 中查找
    // modules: [paths.nodeModulesPath],
  },

  entry: paths.srcPath, // 入口文件

  output: {
    // 因为js我们在生产环境里会把一些公共库和程序入口文件区分开,单独打包构建,采用chunkhash的方式生成哈希值,那么只要我们不改动公共库的代码,就可以保证其哈希值不会受影响,可以继续使用浏览器缓存,所以js适合使用chunkhash。
    filename: "static/js/[name].[chunkhash:8].js",
    path: paths.distPath, // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
  },

  module: {
    parser: {
      javascript: {
        // 当导入的名称在导入模块中不存在时，发出错误而不是警告
        strictExportPresence: true,
      },
    },
    rules: [
      {
        oneOf: [
          {
            include: [paths.srcPath],
            test: /\.[jt]sx?$/, // 匹配.ts, tsx文件
            use: [
              // 使用时,需将此 loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行。
              // 由于thread-loader不支持抽离css插件MiniCssExtractPlugin.loader(下面会讲),所以这里只配置了多进程解析js,开启多线程也是需要启动时间,大约600ms左右,所以适合规模比较大的项目。
              "thread-loader",
              // 由于webpack默认只能识别js文件,不能识别jsx语法,需要配置loader的预设预设 @babel/preset-typescript 来先ts语法转换为 js 语法,再借助预设 @babel/preset-react 来识别jsx语法。
              "babel-loader",
            ],
          },
          {
            include: [paths.srcPath],
            test: /\.(sa|sc|c)ss$/,
            use: [
              // style-loader 将 css 插入到 head 中的 style 标签中
              isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              { loader: "css-loader", options: { modules: true } },
              "postcss-loader",
              {
                loader: "sass-loader",
                options: {
                  sassOptions: {
                    includePaths: [],
                  },
                  additionalData: `@use "@/css/device/device.mixin.scss" as *;`,
                },
              },
            ],
          },
          {
            test: /\.(png|jpe?g|svg|gif|webp)(\?.*)?$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转base64位
              },
            },
            generator: {
              filename: "static/images/[name].[contenthash:8][ext]", // 文件输出目录和命名
            },
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 匹配字体图标文件
            type: "asset/resource",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转base64位
              },
            },
            generator: {
              filename: "static/fonts/[name].[contenthash:8][ext]", // 文件输出目录和命名
            },
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 匹配媒体文件
            type: "asset/resource",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转base64位
              },
            },
            generator: {
              filename: "static/media/[name].[contenthash:8][ext]", // 文件输出目录和命名
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: paths.htmlPath, // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
      title: "Webpack5+React",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // 替换 html 中的 %PUBLIC_URL%
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "",
    }),
    new EnvironmentPlugin({
      BASE_ENV: process.env.NODE_ENV,
    }),
    new Dotenv({
      path: `${paths.rootPath}/.env.${process.env.NODE_ENV}`,
    }),
  ],
};

export default config;
