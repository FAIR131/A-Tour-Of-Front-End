//  /?name=xxx&age=xxx#top
function urlQuery(arg) {
    let res = {}
//    是不是字符串类型
    if (Object.prototype.toString.call(arg) !== '[object String]') {
        return []
    }

//    找到问号和井号之间的部分
    let ind1 = null
    let ind2 = null
    if (arg.includes('?')) {
        ind1 = arg.indexOf('?')
    }
    if (arg.includes('#')) {
        ind2 = arg.indexOf('#')
    }
//    如果没找到
    if (!ind1) return {}
    if (!ind2) {
        //    从问号一直向后切
        res =  arg.slice(ind1+1);
    } else {
        res = arg.slice(ind1+1, ind2)
    }
    return deepQuery(res)
}

function deepQuery(arg){
    let res = {}
    arg.split('&').forEach(item=>{
     let  [key,val] = item.split('=');
     res[key] = val
    })

    return res
}

//node.js的导出
module.exports = {urlQuery};