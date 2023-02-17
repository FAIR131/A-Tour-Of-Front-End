//当前文件中书写HTML模板
const template = `
    <div id="third">
      这是wan年老san
    </div>

`;

const content = document.querySelector('#content')
function render(){
//    render渲染 把HTML重新渲染 （重排）
    content.innerHTML = template;
}


//导出
export default render