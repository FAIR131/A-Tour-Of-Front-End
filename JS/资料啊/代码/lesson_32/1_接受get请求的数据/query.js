//   /?name=xxx&age=xxx#top
function urlQuery(arg){
    let res = {};
    //是不是字符串类型
    // console.log(Object.prototype.toString.call(arg));
    if(Object.prototype.toString.call(arg) !== "[object String]") return {};

    //找到?和#之间的部分
    let ind1 = null;
    let ind2 = null;

    if(arg.includes("?")){//true
        ind1 = arg.indexOf("?");//1
    } 

    if(arg.includes("#")){//true
        ind1 = arg.indexOf("#");//1
    } 

    //如果没有? 代表没有参数
    if(!ind1) return {};

    if(!ind2){
        //从?的索引位置一直向后切
        res = arg.slice(ind1+1);
    }else{
        res = arg.slice(ind1+1,ind2);
    }

    return deepQuery(res)
}

function deepQuery(arg){
    let res = {};
    //name=tom&age=18 --> ["name=tom","age=18"]
    
    arg.split("&").forEach(item=>{
        //["name","tom"]   [age,18]
        let [key,val] = item.split("=");
        res[key] = val;
    })

    return res
}

//nodejs 的导出
module.exports = {urlQuery};