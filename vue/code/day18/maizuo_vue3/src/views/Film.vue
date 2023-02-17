<template>
<!--  标签页-->
  <van-tabs v-model:active="active">
    <van-tab title="正在热映">
     <FilmList :active="active"></FilmList>
    </van-tab>
    <van-tab title="即将上映">
      <FilmList :active="active"></FilmList>
    </van-tab>
  </van-tabs>
<!--  <router-view></router-view>-->
</template>

<script setup>
import { ref} from "vue";
import FilmList from "@/components/FilmList";
const active = ref(0);
</script>
