//当前文件中书写HTML模板
const template = `
    <div id="last">
      这是老末
    </div>

`;

const content = document.querySelector('#content')
function render(){
//    render渲染 把HTML重新渲染 （重排）
    content.innerHTML = template;
}


//导出
export default render