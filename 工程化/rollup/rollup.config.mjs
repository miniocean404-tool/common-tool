// rollup 官方插件
// https://github.com/rollup/plugins

import path from 'path'
const __dirname = path.resolve()

import alias from '@rollup/plugin-alias'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import json from 'rollup-plugin-json'
import terser from '@rollup/plugin-terser'

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import clear from 'rollup-plugin-clear'

import run from '@rollup/plugin-run'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const mode = process.env.NODE_ENV
const dev = mode === 'development' || mode === 'testing' || process.env.ROLLUP_WATCH === 'true'
const prod = mode === 'production'

export default {
  input: ['./src/timeout/thread', './src/timeout/index'], // 入口文件
  output: [
    {
      // file: 'dist/index.js', // 目标文件
      dir: 'dist', // 输出多个文件时，需要使用 dir,并且不使用 file
      format: 'cjs', // iife 是自执行函数，所有环境公用的包文件格式
      banner: '/* ms-template version  */', //在代码块顶部展示头部信息
      footer: '/* ms-template version  */', //在代码底部部展示
      name: 'msTemplate', // 对于导出值的iife/umd包来说是必需的，在这种情况下，它是代表您的包的全局变量名称
      entryFileNames: 'entry/[name].[format].js', // 拆分为多个文件时的入口文件输出命名
      chunkFileNames: 'chunk/[name]-[hash].[format].js', // 拆分为多个文件时的包输出命名
      compact: true, // 这将缩小汇总生成的包装代码
      sourcemap: true,
      dynamicImportInCjs: true,
      inlineDynamicImports: false, // 这将内联动态导入，而不是创建新的块来创建单个包。仅当提供 input 时才可以。请注意，这将更改执行顺序：如果动态导入是内联的，则仅动态导入的模块将立即执行
      // exports: 'named', // 指定导出模式（自动、默认、命名、无）
      // preserveModules: false, // 是否保留模块结构
      // preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
    },
  ],
  plugins: [
    // 清除目录
    prod &&
      clear({
        targets: ['dist'], // 项目打包编译生成的目录
        watch: true, // 实时监听文件变化
      }),
    dev &&
      serve({
        open: false, // 运行时自动打开浏览器
        verbose: false, // 是否打印详情
        headers: {
          'Access-Control-Allow-Origin': '*', // 本地服务允许跨域
        },
        contentBase: ['public', '.'], // 本地服务的运行文件根目录
        port: 3000, // 设置网络服务监听端口
      }),
    dev &&
      livereload({
        watch: 'dist',
        verbose: false, // Disable console output
      }), //实时刷新
    // 打包后立即用 node 运行
    dev &&
      run({
        execArgv: ['-r', 'source-map-support/register'],
      }),

    //处理json
    json(),
    // 处理动态导入
    dynamicImportVars(),
    // 处理别名
    alias({
      entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    }),
    commonjs({
      // dynamicRequireTargets: [
      //   // 有写动态导入的文件
      //   './src/timeout/thread.js',
      //   // 排除一些文件优化性能
      //   '!node_modules',
      // ],
      // ignoreDynamicRequires: true, // 忽略动态导入
      transformMixedEsModules: true,
      sourceMap: true,
    }),
    // 合并第三方库,告诉 Rollup 将引用的依赖打包进去
    prod &&
      resolve({
        // preferBuiltins: false
        extensions: ['.mjs', '.js', '.json'],
      }),
    // 代码压缩，去除注释
    prod && terser(),
  ],
  // 作用：指出应将哪些模块视为外部模块，否则会被打包进最终的代码里
  external: [''],
  treeshake: true, // 树摇
}
