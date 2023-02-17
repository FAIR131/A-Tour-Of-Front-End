<template>
  <RouterView></RouterView>

  <van-tabbar v-model="active" :route="true" active-color="#ff5f16" inactive-color="#797d82">
    <van-tabbar-item icon="shield-o" to="/film">电影</van-tabbar-item>
    <van-tabbar-item icon="search" to="/cinema">影院</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/news">资讯</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const active = ref(0);
    return { active };
  },
};

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
