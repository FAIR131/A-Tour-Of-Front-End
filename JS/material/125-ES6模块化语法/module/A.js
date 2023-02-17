/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
function A1(){
    _a_common()
    console.log("A1-布局创建")
}



function A2(){
    _a_common()
    console.log("A2-布局创建")
}


function _a_common(){
    console.log("a_common")
}

function test(){
    console.log("A1-test")
}


function A_A(){
    console.log("A_A")
}

//导出
export {
    A1,
    A2,
    test,
    A_A
}