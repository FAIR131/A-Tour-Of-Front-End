<template>
  <div id="app">
    <!--4.设置路由显示出口-->
    <router-view></router-view>
    <ul class="tabBar">
<!--      声明式导航-->
      <li>
        <router-link to="/film">
          <img v-if="$router.currentRoute.path==='/film'" src="./assets/film_a.png" alt="">
          <img v-else  src="./assets/film.png">
          <span>电影</span>
        </router-link>
      </li>
      <li>
        <router-link to="/cinema">
          <img v-if="$router.currentRoute.path==='/cinema'" src="./assets/cinema_a.png" alt="">
          <img v-else src="./assets/cinema.png">
          <span>影院</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/news'}">
          <img src="./assets/news.png">
          <span>资讯</span>
        </router-link>
      </li>
      <li>
        <router-link to="/mine">
          <img v-if="$router.currentRoute.path==='/mine'" src="./assets/mine_a.png" alt="">
          <img v-else src="./assets/mine.png">
          <span>我的</span>
        </router-link>
      </li>

    </ul>

  </div>


</template>

<script>

import router from "@/router";

export default {
  name: 'App',
  components: {},
  mounted() {
    // console.log(this.$router)

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
  /*margin-top: 60px;*/
}

* {
  margin: 0;
  padding: 0;
}

.tabBar {
  position: fixed;
  width: 100%;
  bottom: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
}

img {
  width: 20px;
  height: 20px;
  margin: 0 auto;
}

.tabBar li a {
  padding: 8px 0 0;
  text-decoration: none;
  color: #797d82;
  display: flex;
  flex-direction: column;
  width: 94px;
  height: 50px;

}

.tabBar li a.router-link-active {
  color: #ff5f16;
}

.tabBar li a span{
  font-size:12px;
}
</style>
