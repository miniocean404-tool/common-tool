const getDesk = false

// 获取当前打开的 finder 的路径，或桌面路径
console.log(
  `osascript -e 'tell application "Finder" to get the POSIX path of ${
    getDesk ? "(target of front window as alias)" : "(path to desktop)"
  }'`,
)
