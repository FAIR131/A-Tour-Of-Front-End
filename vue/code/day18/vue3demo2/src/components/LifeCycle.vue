<template>
  <div>
    生命周期：{{ num }},numPlus:{{plusNum}}
    <button @click="changeNum">改数</button>
    <hr>
    {{ user.username }}
    <button @click="changeName">改名</button>
    <hr>
    {{name}}---{{alias}}
    <button @click="changeOfficial">修改名字</button>
  </div>
</template>

<script>
import {onBeforeMount, onMounted, ref, reactive, watch, watchEffect, computed, toRefs} from "vue";
import {num,changeNum,plusNum} from "@/components/js/useNum";
import useUser from "@/components/js/useUser";
export default {
  name: "LifeCycle",
  // setup函数在执行时,组件实例都没有创建,它是vue3中第一个执行的函数
  // 在vue3中如果使用组合式api开发,原则上不再写其他选项式API了
  setup() {
    // console.log("setup函数执行了",this)
    let baozheng=reactive({
      name:"包拯",
      alias:"包青天",
      unit:"开封府",
      home:"合肥"
    })

    let changeOfficial = function (){
      baozheng.name="公孙策"
    }


    // 组合式api中的生命周期,执行顺序和功能与vue2相同
    onBeforeMount(() => {
      // console.log(document.getElementById("app").innerHTML);
    })

    onMounted(() => {
      // console.log(document.getElementById("app").innerHTML);
    })



    //同时侦听多个数据项
   /* watch([num,()=>user.username],(newVal,oldVal)=>{
      console.log(newVal,oldVal)
    })
*/
    //setup函数需要返回一个对象，所有需要在页面上复用的数据或方法都要通过这个对象返回出去
    return {
      num, changeNum,
      plusNum,
      ...useUser,
      ...toRefs(baozheng),
      changeOfficial
     /* user,
      changeName,*/
    }
  },

  beforeCreate() {
    // console.log("beforeCreate函数执行了")
  }


}
</script>

<style scoped>

</style>