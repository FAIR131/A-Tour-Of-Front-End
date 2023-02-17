
//当前文件当中书写html模板
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

const content = document.querySelector("#content");

function render(){//render渲染   把html重写渲染
    content.innerHTML = template;
}


//导出
export default render