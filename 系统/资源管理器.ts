const getDesk = false

// Mac
// 获取当前打开的 finder 的路径，或桌面路径
console.log(
  `osascript -e 'tell application "Finder" to get the POSIX path of ${
    getDesk ? "(target of front window as alias)" : "(path to desktop)"
  }'`,
)

// 打开当前路径下的文件夹
// open https://www.baidu.com/ 打开网页
// open file://xxxx 打开文件
console.log(`open .`)

// Windows
// 打开当前路径下的文件夹
console.log(`explorer .`)
// start https://www.baidu.com/ 打开网页
// start file://xxxx 打开文件
console.log(`start .`)
