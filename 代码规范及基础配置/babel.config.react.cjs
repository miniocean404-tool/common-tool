const isDEV = process.env.NODE_ENV === "development"; // 是否是开发模式

// 官方 React 插件是
module.exports = {
  // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  presets: [
    [
      "@babel/preset-env",
      {
        // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
        // "targets": {
        //  "chrome": 35,
        //  "ie": 9
        // },
        useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        corejs: 3, // 配置使用core-js使用的版本
      },
    ],
    // 预设包含了 @babel/plugin-transform-react-jsx 插件，这里面包含了 react-jsx-runtime 需要使用 runtime: "automatic" 开启
    // 不需要每个界面都导入 React 了
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
  // babel 处理装饰器语法
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],

    isDEV && require.resolve("react-refresh/babel"), // 如果是开发模式,就启动react热更新插件
  ].filter(Boolean), // 过滤空值,
};
