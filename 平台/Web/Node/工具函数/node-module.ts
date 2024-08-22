import { createRequire } from "node:module"
import { parseArgs } from "node:util"

const currentVersion = createRequire(import.meta.url)("../package.json").version

const { values: args, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    preid: {
      type: "string",
    },
    dry: {
      type: "boolean",
    },
    tag: {
      type: "string",
    },
    canary: {
      type: "boolean",
    },
    skipBuild: {
      type: "boolean",
    },
    skipTests: {
      type: "boolean",
    },
    skipGit: {
      type: "boolean",
    },
    skipPrompts: {
      type: "boolean",
    },
    publish: {
      type: "boolean",
      default: false,
    },
    publishOnly: {
      type: "boolean",
    },
    registry: {
      type: "string",
    },
  },
})
