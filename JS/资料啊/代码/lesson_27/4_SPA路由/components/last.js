
//当前文件当中书写html模板
const template = `
    <div id="last">   
        这是老幺
    </div>
`;

const content = document.querySelector("#content");

function render(){//render渲染   把html重写渲染
    content.innerHTML = template;
}


//导出
export default render