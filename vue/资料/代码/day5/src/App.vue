<template>
  <div id="app">
    <!-- {{words}} -->

    <!-- <MyComp></MyComp> -->
    <!-- <Caocao></Caocao> -->
    <!-- <Xieguangkun></Xieguangkun> -->
    <!-- <ZhuYuanZhang></ZhuYuanZhang> -->

    <!-- <Street> -->
      <!-- v-slot可以简写为# -->
      <!-- <template #fourth>
        <p>网鱼网咖</p>
        <p>新店开业大酬宾</p>
      </template>
      <template #default>
        <p>KFC crazy Thursday V Me 50 元</p>
      </template> -->
      <!-- 作用域插槽,让插槽可以给使用者传值 -->
      <!-- <template #third="row">
        <p>红烂漫洗浴中心</p>
        <p>{{ row.notify }}</p>
      </template>
    </Street>
    <hr />
    <Table :users="users" #default="row">       -->
      <!-- <td>{{row.stu.score>=60?"及格":"不及格"}}</td> -->
      <!-- <td v-if="row.stu.score>=60&&row.stu.score<70">良好</td>
      <td v-else-if="row.stu.score>=70&&row.stu.score<80">优秀</td>
      <td v-else>棒的一批</td>
    </Table> -->

    <!-- 路由显示出口 -->
    <router-view/>
  </div>
</template>

<script>
import MyComp from "./components/MyComp.vue";
// import bus from './bus'
import Caocao from "./components/Caocao.vue";
import Xieguangkun from "./components/Xieguangkun.vue";
import ZhuYuanZhang from "./components/ZhuYuanZhang.vue";
import Street from "./components/Street.vue";
import Table from "./components/Table.vue";
export default {
  name: "App",
  components: {
    MyComp,
    Caocao,
    Xieguangkun,
    ZhuYuanZhang,
    Street,
    Table,
  },
  data: function () {
    return {
      words: "today is a nice day",
      users: [
        {
          username: "zhangsan",
          age: 20,
          score:50
        },
        {
          username: "lisi",
          age: 21,
          score:70
        },
        {
          username: "wangwu",
          age: 20,
          score:90
        },
      ],
    };
  },
  mounted: function () {
    this.$bus.$on("grandpa", function (params) {
      console.log("grandpa函数被执行了,接收参数:", params);
    });
  },
};
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
