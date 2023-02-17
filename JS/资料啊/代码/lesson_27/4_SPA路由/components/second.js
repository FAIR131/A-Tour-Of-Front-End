
//当前文件当中书写html模板
const template = `
    <div id="second">   
        这是千年老二
    </div>
`;

const content = document.querySelector("#content");

function render(){//render渲染   把html重写渲染
    content.innerHTML = template;
}


//导出
export default render