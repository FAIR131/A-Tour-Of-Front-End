<template>
  <van-tabs v-model:active="active">
    <van-tab title="正在热映">
      <FilmList :active="active"></FilmList>
    </van-tab>
    <van-tab title="即将上映">
      <FilmList :active="active"></FilmList>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import FilmList from "../components/FilmList.vue";
import { ref} from "vue";
const active = ref(0);
</script>

<style lang="scss" scoped>
</style>