const template = `
    <div id="info">
        <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
        </ul>
    </div>

`;

const content = document.querySelector('.content');
function render(){
    content.innerHTML = template;
}

export default render