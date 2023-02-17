<template>
  <router-view></router-view>
  <van-tabbar v-model="active" :route="true">
    <van-tabbar-item icon="home-o" to="/film">电影</van-tabbar-item>
    <van-tabbar-item icon="search" to="/cinema">影院</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/news">资讯</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
  </van-tabbar>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
const active = ref(0);
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
