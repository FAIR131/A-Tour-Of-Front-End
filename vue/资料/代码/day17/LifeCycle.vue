<template>
  <div>
    生命周期:{{num}}
    <button @click="changeNum">改值</button>
    <hr/>
    {{user.username}}
    <button @click="changeName">改名</button>
  </div>
</template>

<script>
import {onBeforeMount,onMounted,ref,reactive} from 'vue'
export default {
    // setup函数在执行时,组件实例都没有创建,它是vue3中第一个执行的函数
    // 在vue3中如果使用组合式api开发,原则上不再写其他选项式API了
    setup:function(){
        // console.log("setup函数执行了",this);

        // 通过ref方法声明一个简单类型数据,得到的是一个代理对象
        let num=ref(10);
        
        // 通过reactive方法声明复杂数据类型,它在处理复杂类型数据时比ref更便捷
        let user=reactive({username:"zhangsan",age:20})

        console.log(user);

        // 组合式api中的生命周期,执行顺序和功能与vue2相同
        onBeforeMount(()=>{
            // console.log(document.getElementById("app").innerHTML);
        })

        onMounted(()=>{
            // console.log(document.getElementById("app").innerHTML);
        })

        let changeNum=function(){
            // console.log(num);
            // 通过ref声明的num是一个代理对象,可以直接渲染在页面,但修改值时要修改它的value属性
            num.value++
        }

        let changeName=function(){
            // user.value.username="lisi"
            user.username="wangwu"
        }

        // setup函数需要返回一个对象,所有需要在页面上使用的数据或方法都要通过这个对象返回出去
        return {
            num,changeNum,
            user,changeName
        }
    }
}
</script>

<style>

</style>