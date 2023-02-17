function createDom(vd){

//创建节点
    let app=document.createElement(vd.tagName);
//添加节点属性
    for (const key in vd.props){
        if (key==='style'){
            for (const skey in vd.props[key]){
                app.style[skey]=vd.props[key][skey]
            }
        }else{
            app.setAttribute(key,vd.props[key])
        }
    }

//添加子元素
    vd.children.forEach(item=>{
        if (typeof item==='string'){
            app.appendChild(document.createTextNode(item))
        }else{
            app.appendChild(createDom(item))
        }
    })

    return app
}