<template>
  <div>
    生命周期:{{num}},numPlus:{{plusNum}}
    <button @click="changeNum">改值</button>
    <hr/>
    {{user.username}}
    <button @click="changeName">改名</button>
  </div>
</template>

<script>
import {onBeforeMount,onMounted,ref,reactive,watch,watchEffect,computed} from 'vue'
export default {
    // setup函数在执行时,组件实例都没有创建,它是vue3中第一个执行的函数
    // 在vue3中如果使用组合式api开发,原则上不再写其他选项式API了
    setup:function(){
        // setup函数在beforeCreate之前执行,此时实例还没创建,所以没有this

        // 通过ref方法声明一个简单类型数据,得到的是一个代理对象
        let num=ref(10);
        
        // 通过reactive方法声明复杂数据类型,它在处理复杂类型数据时比ref更便捷
        let user=reactive({username:"zhangsan",age:20})

        // console.log(user);

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

        // 直接侦听一个ref变量
        // watch(num,(newVal,oldVal)=>{
        //     console.log(newVal,oldVal);
        // })

        // 侦听复杂数据类型时,可以在第一个参数位置写函数,函数返回要侦听的属性
        // watch(()=>user.username,(newVal,oldVal)=>{
        //     console.log(newVal,oldVal);
        // })

        // 同时侦听多个数据项
        // watch([num,()=>user.username],(newVal,oldVal)=>{
        //     console.log(newVal,oldVal);
        // })

        // watchEffect在首次渲染时就会触发执行,而watch不会
        watchEffect(()=>{
            // 此处的num因为是一个数据项,所以他是watchEffect的依赖数据
            document.title=num.value;
        })

        // 声明一个计算属性
        let plusNum=computed(()=>num.value*2);
        

        // setup函数需要返回一个对象,所有需要在页面上使用的数据或方法都要通过这个对象返回出去
        return {
            num,changeNum,
            user,changeName,plusNum
        }
    }
}
</script>

<style>

</style>