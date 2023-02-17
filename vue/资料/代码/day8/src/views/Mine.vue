<template>
  <div class="mine">
    我的
    <button @click="toNews">去新闻页</button>

    <p>
      <!-- 获取vuex中的数据 -->
      <!-- store中的count数据:{{$store.state.count}} -->
      <hr/>
        <!-- <p>主模块中的User:{{$store.state.currentUser.username}}</p> -->
        <p>主模块中的User:{{currentUser.username}}</p>

        <!-- <p>子模块中的User:{{$store.state.user.currentUser.username}}</p> -->
        <p>子模块中的User:{{myUser.username}}</p>
      <hr/>
      <button @click="changeCount">修改count</button>
      <button @click="updateUser">修改currentUser</button>
    </p>

    <!-- <FilmList :films="$store.state.collect_films" :mode="2"></FilmList> -->

    <FilmList :films="collect_films" :mode="2"></FilmList>

    <p>count的值:{{count}}</p>
  </div>
</template>

<script>
import FilmList from "../components/FilmList.vue";
import { mapState,mapMutations } from "vuex";
export default {
  components: {
    FilmList,
  },
  computed: {
    // 数组写法
    ...mapState(["collect_films", "count", "currentUser"]),
    // ...mapState("user",["currentUser"])
    // 对象写法
    ...mapState("user", {
      myUser:state=>state.currentUser
    }),
  },
  methods: {
    ...mapMutations(["increment"]),
    ...mapMutations("user",["init_current_user"]),
    toNews: function () {
      // this.$router.push("/news/abc456")
      // this.$router.push({name:"xinwen",params:{id:"haha123"}})

      // 通过命名路由也可以跳转
      // this.$router.push({name:"xinwen"})

      // 通过query方式跳转到目标页面后,可以通过路由对象中的currentRoute中的query去获取
      // console.log(this.$router.currentRoute.query);

      console.log(this.collect_films);
    },
    changeCount: function () {
      // console.log(this.$store.state.count)
      // 通过store上的commit方法可以调用mutations函数
      // this.$store.commit("increment", 10);
      this.increment(10)
    },
    updateUser: function () {
      // 调用主模块中的方法
      // this.$store.commit("init_current_user",{username:"lisi",age:30})
      // 调用子模块中的方法,在方法名前加上模块名称
      
      this.init_current_user({username:"lisi",age:30})
      // this.$store.commit("user/init_current_user", {
      //   username: "lisi",
      //   age: 30,
      // });
    },
  },
};
</script>

<style>
</style>