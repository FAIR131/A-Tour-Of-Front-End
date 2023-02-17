// 通过reactive方法声明复杂数据类型,它在处理复杂类型数据时比ref更便捷
import {reactive, watch} from "vue";

let user = reactive({username: 'zs', age: 20})
let changeName=function (){
    user.username='ww'
}

//侦听复杂数据类型时，可以在第一个参数位置写函数，函数返回要侦听的属性
watch(()=>user.username,(newVal,oldVal)=>{
    console.log(newVal,oldVal)
})

export default {
    user,changeName
}
