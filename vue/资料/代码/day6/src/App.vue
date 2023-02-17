<template>
  <div id="app">
    <!-- 4、设置路由显示出口 -->
    <router-view></router-view>

    <ul class="tabBar">
      <li>
        <!-- 声明式导航 -->
        <router-link to="/film">
          <img v-if="$router.currentRoute.path==='/film'" src="./assets/tabBar/film_active.png" alt="" />
          <img v-else src="./assets/tabBar/film.png" alt="" />
          <span>电影</span>
        </router-link>
      </li>
      <li><router-link to="/cinema">影院</router-link></li>
      <!-- <li><router-link to="/news">资讯</router-link></li> -->
      <li><router-link :to="{path:'/news'}">资讯</router-link></li>
      <li><router-link to="/mine">我的</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted:function(){
    // console.log(this.$router.currentRoute.path);
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.tabBar {
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  width: 100%;
  bottom: 0;
  background: white;
}
.tabBar li a {
  text-decoration: none;
  color: #797d82;
  display: flex;
  flex-direction: column;
}
.tabBar li a.router-link-active {
  color: #ff5f16;
}
.tabBar li a img{
  width: 21px;
  height: 21px;
  padding-top:8px;
}
.tabBar li a span{
  font-size:12px;
}
</style>
