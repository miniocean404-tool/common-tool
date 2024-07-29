import child_process from "child_process"

function oepnDir(dir: string) {
  switch (process.platform) {
    case "darwin":
      child_process.exec("open .")
      break
    case "win32":
      child_process.exec("explorer .")
      break

    default:
  }
}
