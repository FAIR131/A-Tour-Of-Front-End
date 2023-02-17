var patchs = {}
function diff(oldDom, newDom) {
    if (oldDom.key === newDom.key) {
        patchs[oldDom.key] = []
        for (const key in oldDom.props) {
            if (typeof oldDom.props[key] === 'object') {

                if (JSON.stringify(oldDom.props[key]) !== JSON.stringify(newDom.props[key])) {
                    // 属性值是对象,发现了不同,记录补丁包
                }

            } else if (oldDom.props[key] !== newDom.props[key]) {
                patchs[oldDom.key].push({ type: "ATTR", name: key, value: newDom.props[key] })
            }
        }


        oldDom.children.forEach((item, index) => {
            if (item.key) {
                if(!newDom.children[index]){
                    patchs[oldDom.key].push({type:"REMOVE",index})
                }else{
                    diff(oldDom.children[index], newDom.children[index])
                    newDom.children[index].compare=true;
                }
            } else {
                if (item !== newDom.children[index]) {
                    patchs[oldDom.key].push({ type: "TEXT", value: newDom.children[index], index })
                }
            }
        })

        newDom.children.forEach(item=>{
            if(!item.compare){
                patchs[newDom.key].push({type:"INSERT",value:item})
            }
        })

    }
    return patchs;
}