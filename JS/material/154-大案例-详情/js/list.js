// 面向过程
//1. 获取数据

var current = 0 //记录当前第几页
var isLoading = false //记录是否正在请求，（防止多次请求）
var total = 0 //记录总数据长度
getList()

async function getList() {
    current++
    var res = await fetch(`http://localhost:3000/goods?_page=${current}&_limit=5`)
    // console.log()
    total = res.headers.get("X-Total-Count")
    var list = await res.json()
    // console.log(list)
    renderHTML(list)

    return list
}

function renderHTML(arr) {

    for (let i = 0; i < arr.length; i++) {
        var oli = document.createElement("li")
        oli.innerHTML = `<img src="http://localhost:3000${arr[i].poster}" alt="">
            <h3>${arr[i].title}</h3>`

        //事件绑定
        oli.onclick =function(){
            // console.log()
            //跳转
            location.href=`detail.html?id=${arr[i].id}`
        }

        list.appendChild(oli)
    }
}

window.onscroll = function () {
    // console.log(list.children.length,total)
    if(list.children.length===Number(total)){
        return 
    }


    // console.log("1111")
    var listHeight = list.offsetHeight
    var listTop = list.offsetTop

    // console.log(listHeight+listTop)

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    var windowHeight = document.documentElement.clientHeight

    // console.log()
    if (isLoading) return
    if ((listHeight + listTop) - Math.round(windowHeight + scrollTop) < 50) {
        console.log("到底了")
        isLoading = true


        //渲染下一页数据
        // setTimeout(function () {
        //     renderHTML(arr2)

            
        // }, 1000)

        getList().then(()=>{
            isLoading = false //下一次到底事件继续触发
        })
    }
}