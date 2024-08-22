const path = require('path')
const fs = require('fs')

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
  name: 'esbuild-problem-matcher',
  setup(build) {
    build.onStart(() => {
      console.log('[watch] build started')
    })

    build.onEnd((result) => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`)
        console.error(`    ${location.file}:${location.line}:${location.column}:`)
      })
      console.log('[watch] build finished\n')
    })
  },
}

/**
 * 处理 .node 文件
 * @type {import('esbuild').Plugin}
 */
const nativeNodeModulesPlugin = {
  name: 'native-node-modules',
  setup(build) {
    // 它设置为绝对路径，并将其放入“node-file”虚拟命名空间中
    build.onResolve({ filter: /\.node$/, namespace: 'file' }, (args) => {
      // args.path 为源文件导入路径写法
      // args.resolveDir 为源文件所在目录
      return {
        path: path.join(args.resolveDir, args.path),
        namespace: 'node-file',
      }
    })

    // “node-file”虚拟命名空间中的文件在输出目录中的“.node”文件的esbuild路径上调用“require（）”
    build.onLoad({ filter: /.*/, namespace: 'node-file' }, (args) => {
      return {
        contents: `
                    import path from ${JSON.stringify(args.path)}
                    try { module.exports = require(path) }
                    catch {}
                  `,
      }
    })

    // 如果在 “node-file” 命名空间的模块中导入了 “.node” 文件，请将其放在 “file” 命名空间中，esbuild 的默认加载行为将处理它。这已经是一个绝对路径，因为我们将其解析为上述路径
    build.onResolve({ filter: /\.node$/, namespace: 'node-file' }, (args) => {
      return {
        path: args.path,
        namespace: 'file',
      }
    })

    // 告诉 esbuild 的默认加载行为，以使用“文件”加载器来处理这些 “.node” 文件
    let opts = build.initialOptions
    opts.loader['.node'] = 'file'
  },
}

/**
 * 处理 jsdom require.resolve 导入问题
 * @type {import('esbuild').Plugin}
 */
const jsdomPatch = {
  name: 'jsdom-patch',
  setup(build) {
    build.onLoad({ filter: /XMLHttpRequest-impl\.js$/ }, async (args) => {
      let contents = await fs.promises.readFile(args.path, 'utf8')

      const dir = path.dirname(args.path)

      contents = contents.replace(
        'const syncWorkerFile = require.resolve ? require.resolve("./xhr-sync-worker.js") : null;',
        `const syncWorkerFile = "${require.resolve(`${dir}/xhr-sync-worker.js`)}";`.replaceAll('\\', process.platform === 'win32' ? '\\\\' : '\\'),
      )

      return { contents, loader: 'js' }
    })
  },
}

module.exports = {
  nativeNodeModulesPlugin,
  esbuildProblemMatcherPlugin,
  jsdomPatch,
}
