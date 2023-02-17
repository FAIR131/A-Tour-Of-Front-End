<template>
  <div id="app">
    <!-- <hr>-->
    <!--  <xieguangkun></xieguangkun>-->
     <hr>
    <!--    <zhuyuanzhang></zhuyuanzhang>-->
     <street>

    <!--老写法
     <div slot="fourth">
         <p> 网鱼网咖</p>
         <p>新店开业大酬宾</p>
       </div>
       -->

    <!--   <template v-slot:fourth>-->
    <!--  v-slot:可以简写为# -->
       <template #fourth>
         <p> 网鱼网咖</p>
         <p>新店开业大酬宾</p>
       </template>

    <!--   <template v-slot:fourth>-->
    <!--   <template v-slot:default>-->
    <!--  默认插槽的name叫default，可以不写，用的时候也可以不指定-->
    <!--  一个页面只能写一个默认插槽，多个插槽要用命名区别-->
       <template>
         <p> KFC</p>
         <p>crazy Thursday V me 50元</p>
       </template>
    <!--作用域插槽，让插槽给使用者传值-->
       <template #third="scope">
         <p>水浒烤肉铺</p>
         <p>{{scope.notify}}</p>
       </template>
     </street>

    <hr>
    <table1 :users="users" #default="row">
      <td v-if="row.stu.score>=60&&row.stu.score<70">良好</td>
      <td v-else-if="row.stu.score>=70&&row.stu.score<80">优秀</td>
      <td v-else>棒的一批</td>
    </table1>

    <!--    <router-view></router-view>-->
  </div>
</template>

<script>
import table1 from "@/components/Table";
import street from "@/components/Street";
import xieguangkun from "@/components/Xieguangkun";
import zhuyuanzhang from "@/components/Zhuyuanzhang";

export default {
  name: 'App',
  data() {
    return {
      users: [
        {
          username: 'zs',
          age: 18,
          score: 100
        },
        {
          username: 'ls',
          age: 18,
          score: 50
        },
        {
          username: 'ww',
          age: 18,
          score: 70
        }
      ]
    }
  },
  components: {
    xieguangkun,
    zhuyuanzhang,
    street,
    table1
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
