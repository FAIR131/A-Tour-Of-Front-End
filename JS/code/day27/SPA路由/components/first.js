//当前文件中书写HTML模板
const template = `
    <div id="first">
        <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
        </ul>
    </div>

`;

const content = document.querySelector('#content')
function render(){
//    render渲染 把HTML重新渲染 （重排）
    content.innerHTML = template;
}


//导出
export default render