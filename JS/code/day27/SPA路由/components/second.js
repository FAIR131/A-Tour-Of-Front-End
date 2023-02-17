//当前文件中书写HTML模板
const template = `
    <div id="second">
      这是千年老二
    </div>

`;

const content = document.querySelector('#content')
function render(){
//    render渲染 把HTML重新渲染 （重排）
    content.innerHTML = template;
}


//导出
export default render