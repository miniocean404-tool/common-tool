// pnpm install mammoth --save
// 部分样式无法实现，所以最好还是后端去实现，后端的比较成熟，这里用vue来演示
// <input type="file" name="file" @change="changeFile" />
// <div id="wordView" v-html="wordText" />

// @ts-ignore
import mammoth from "mammoth"

//选择本地文件预览
function changeFile(event) {
  // if(event.target.files[0].name.indexOf('docx')>-1){
  let that = this
  let file = event.target.files[0]
  let reader = new FileReader()
  reader.onload = function (loadEvent) {
    let arrayBuffer = loadEvent.target?.result //arrayBuffer
    mammoth
      .convertToHtml({ arrayBuffer: arrayBuffer })
      // .convertToMarkdown({ arrayBuffer: arrayBuffer })
      .then(that.displayResult)
      .done()
  }
  reader.readAsArrayBuffer(file)
  // }
}

//页面渲染
function displayResult(result) {
  console.log(result.value)
  this.wordText = result.value
}
