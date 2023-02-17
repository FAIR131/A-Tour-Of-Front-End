function createDom(vd) {
    // 创建节点
    var app = document.createElement(vd.tagName)

    // 给元素节点加上key属性
    vd["key"]&&app.setAttribute("key",vd["key"])


    // 添加节点属性
    if (vd.props) {
        for (const key in vd.props) {
            if (key === 'style') {
                for (const sKey in vd.props[key]) {
                    app.style[sKey] = vd.props[key][sKey]
                }
            } else {
                app.setAttribute(key, vd.props[key])
            }
        }
    }
    // 添加子元素
    vd.children && vd.children.forEach(item => {
        // app.innerText = item;
        if (typeof item === 'string') {
            app.appendChild(document.createTextNode(item))
        } else {
            app.appendChild(createDom(item))
        }

    })
    return app
}