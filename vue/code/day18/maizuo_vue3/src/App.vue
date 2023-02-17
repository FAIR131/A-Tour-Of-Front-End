<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
  <router-view/>
  <van-tabbar v-model="active" :route="true" active-color="#ff5f16" inactive-color="#797d82">
    <van-tabbar-item icon="video-o" to="/film">电影</van-tabbar-item>
    <van-tabbar-item icon="photo-o" to="/cinema">影院</van-tabbar-item>
    <van-tabbar-item icon="comment-o" to="/news">资讯</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
  </van-tabbar>

</template>

<script>
import HotFilm from "@/views/film/HotFilm";
import NewFilm from "@/views/film/NewFilm";
import { ref } from 'vue';

export default {
  setup() {
    const active = ref(0);
    return { active };
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
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
