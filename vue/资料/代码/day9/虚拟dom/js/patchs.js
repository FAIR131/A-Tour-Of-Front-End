function doPatchs(patchs){
    for (const key in patchs) {
        // 通过属性选择器获取dom对象
        let node=document.querySelector(`[key='${key}']`);
        
        patchs[key].forEach(item=>{
            if(item.type==='ATTR'){
                node.setAttribute(item.name,item.value)
            }else if(item.type==='TEXT'){
                // 替换文本节点时,通过文本节点的父元素去替换
                node.replaceChild(document.createTextNode(item.value),node.childNodes[item.index])
            }else if(item.type==='REMOVE'){
                node.removeChild(node.childNodes[item.index])
            }else if(item.type==='INSERT'){
                node.appendChild(createDom(item.value))
            }
        })
    }
}