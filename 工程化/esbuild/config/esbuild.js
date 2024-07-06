const esbuild = require('esbuild')
const path = require('path')
const {stat, cp} = require('fs/promises')
const {esbuildProblemMatcherPlugin, nativeNodeModulesPlugin, jsdomPatch} = require('./module.js')
const {patchMainPkgJson} = require('./pkg.js')
const {packageSize} = require('./utils.js')

const production = process.argv.includes('--production')
const watch = process.argv.includes('--watch')

// https://www.notion.so/miniocean404/ESBuild-ef05546197094f7383ee7a80e99aa052
async function main() {
    const external = []
    const outputDir = 'dist'

    /**
     * @type {import('esbuild').BuildOptions}
     */
    const options = {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
        entryPoints: ['src/chabaidao/index.ts'],
        outfile: `${outputDir}/index.js`,
        bundle: true,
        format: 'cjs',
        minify: production,
        // 是否混淆名称
        // keepNames: !production,
        keepNames: true,
        sourcemap: !production,
        sourcesContent: false,
        platform: 'node',
        target: 'node18',
        logLevel: 'silent',
        treeShaking: true,
        plugins: [
            /* add to the end of plugins array */
            esbuildProblemMatcherPlugin,
            nativeNodeModulesPlugin,
            jsdomPatch,
        ],
        // 排除的依赖包
        external,
        loader: {
            [".node"]: "file"
        }
    }

    const ctx = await esbuild.context(options)

    if (watch) {
        await ctx.watch()
        await ctx.rebuild()
    } else {
        await ctx.rebuild()
        await ctx.dispose()
    }

    if (external.length > 0) {
        // 复制资源到构建目录
        for (const ext of external) {
            const dep = ext.startsWith('./') ? ext : `node_modules/${ext}`

            if (await stat(dep)) {
                console.log(`复制 "${dep}" to "${outputDir}" 文件夹`)
                await cp(dep, `${outputDir}/${dep}`, {recursive: true})
            } else {
                console.log(`资源 "${dep}" 不存在. 跳过...`)
            }
        }
    }

    await patchMainPkgJson(outputDir)
    await packageSize(options.outfile)
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
