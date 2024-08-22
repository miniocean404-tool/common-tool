const {writeFile} = require('fs/promises')
const path = require('path')

function cleanPkgJson(json) {
    delete json["devDependencies"]
    delete json['release-it']
    delete json["optionalDependencies"]
    delete json.dependencies
    return json
}

async function patchPkgJson(outputDir, filePath) {
    const pkgJsonPath = path.join(outputDir, filePath, 'package.json')
    const pkgJson = require('./' + pkgJsonPath)
    cleanPkgJson(pkgJson)
    delete pkgJson.scripts
    delete pkgJson.exports
    await writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2))
}

async function patchMainPkgJson(outputDir) {
    const pkgJson = require('../package.json')
    cleanPkgJson(pkgJson)

    pkgJson.scripts = {
        start: 'node index.js',
    }

    pkgJson.bin = 'index.js'
    pkgJson.pkg = {
        assets: ['dist/**', 'snippets/**', 'node_modules/**'],
    }

    await writeFile(`${outputDir}/package.json`, JSON.stringify(pkgJson, null, 2))
}

module.exports = {
    cleanPkgJson,
    patchPkgJson,
    patchMainPkgJson,
}
