import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.base";
import paths from "./webpack.paths";

import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
// gzip,可以有效减少静态资源文件大小,压缩率在 70% 左右。
// nginx可以配置gzip: on来开启压缩,但是只在nginx层面开启,会在每次请求资源时都对资源进行压缩,压缩文件会需要时间和占用服务器cpu资源，更好的方式是前端在打包的时候直接生成gzip资源,服务器接收到请求,可以直接把对应压缩好的gzip文件返回给浏览器,节省时间和cpu
import CompressionPlugin from "compression-webpack-plugin";
// 设置 mode 为 production 时,webpack会使用内置插件terser-webpack-plugin压缩js文件,该插件默认支持多线程压缩,但是上面配置optimization.minimizer压缩css后,js压缩就失效了,
// 需要手动再添加一下,webpack内部安装了该插件,由于pnpm解决了幽灵依赖问题,如果用的pnpm的话,需要手动再安装一下依赖
import TerserPlugin from "terser-webpack-plugin";

const config: Configuration = merge(baseConfig, {
  // mode为production时就会默认开启tree-shaking
  mode: "production",
  // 关闭 webpack 性能优化建议
  performance: false,
  // 将第一个错误报告为硬错误，而不容忍他
  bail: true,
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: paths.publicPath, // 复制public下文件
          to: paths.distPath, // 复制到dist目录中
          filter: (source) => {
            return !source.includes("index.html"); // 忽略index.html
          },
        },
      ],
    }),
    // 抽离css插件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css", // 抽离css的输出目录和名称
    }),
    new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css,js压缩文件
      filename: "[path][base].gz", // 文件命名
      algorithm: "gzip", // 压缩格式,默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8, // 压缩率,默认值是 0.8
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        // 压缩js
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            drop_console: true, // 生产环境下移除控制台所有的内容
            drop_debugger: true, // 移除断点
            pure_funcs: ["console.log"], // 删除 console.log
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
    // 一般第三方包的代码变化频率比较小,可以单独把node_modules中的代码单独打包, 当第三包代码没变化时,对应chunkhash值也不会变化,可以有效利用浏览器缓存，还有公共的模块也可以提取出来,
    // 避免重复打包加大代码整体体积, webpack提供了代码分隔功能, 需要我们手动在优化项optimization中手动配置下代码分隔splitChunks规则。
    splitChunks: {
      // 分隔代码
      cacheGroups: {
        vendors: {
          // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: "vendors", // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: {
          // 提取页面公共代码
          name: "commons", // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
        react: {
          // 基本框架
          name: "react-core",
          chunks: "all",
          test: /(react|react-dom|react-dom-router)/,
          priority: 2,
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
        default: {
          minChunks: 2, //覆盖外层的全局属性
          priority: 3,
          reuseExistingChunk: true, //是否复用已经从原代码块中分割出来的模块
        },
      },
    },
  },
});

export default config;
