<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
  >
    <van-cell v-for="item in films" :key="item.filmId">
      <div style="display: flex;align-items:center">
        <van-image width="66" height="92" :src="item.poster" />
        <div style="width: 200px">
          {{ item.name }}
        </div>
        <van-button plain color="#ff5f16" size="small">收藏</van-button>
      </div>
    </van-cell>
  </van-list>
</template>

<script setup>
import http from "../../utils/request";
import { onMounted, reactive,ref } from "vue";
const loading = ref(false);
const finished = ref(false);
var films = reactive([]);
onMounted(() => {
  http
    .get("/gateway", {
      params: {
        cityId: "330100",
        pageNum: 1,
        pageSize: 10,
        type: 1,
        k: "5691835",
      },
    })
    .then((res) => {
      // reactive在此处修改值时不能直接赋值,会改变数据类型
      films.push(...res.data.data.films);
    });
});
</script>

<style lang="scss" scoped>
</style>