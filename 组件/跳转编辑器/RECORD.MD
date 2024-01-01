跳转代码方式

## 打开应用

1. vscode: vscode://file/${path}:0:0
2. webstorm: webstorm://open?file=${props.filePath}&line=0&column=0
3. github:

```js
   const githubAddr = "https://github.com/miniocean404-vue/tool_and_demo_vite_vue3"
   const branch = "master"
   url = `${githubAddr}/blob/${branch}/${`src${props.filePath.split("src").slice(-1)[0]}`}#L${line}-L${line+1}`
```

## 命令行

1. vscode: code -r -g 完整路径:行数:列数
2. webstorm64.exe --line 行数 --column 列数 文件路径
