import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import prodConfig from "./webpack.prod";

// 引入webpack打包速度分析插件
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
// 引入分析打包结果插件
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const smp = new SpeedMeasurePlugin(); // 实例化分析插件

// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
const config: Configuration = smp.wrap(
  merge(prodConfig, {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        analyzerHost: "127.0.0.1",
        analyzerPort: 8888,
        openAnalyzer: true,
      }),
    ],
  }),
);

export default config;
