<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in films" :key="item.filmId">
        <div style="display: flex; align-items: center">
          <van-image width="66" height="92" :src="item.poster" />
          <div style="width: 200px">
            {{ item.name }}
          </div>
          <van-button plain color="#ff5f16" size="small" @click="collectFilm(item)">收藏</van-button>
        </div>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import http from "../utils/request";
import { ref, reactive } from "vue";
import { useStore } from 'vuex'
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
var films = reactive([]);
let pageNum=ref(0);
const store=useStore();

let { active } = defineProps(["active"]);

const onLoad = () => {
    pageNum.value++;
  // 加载状态开始
  loading.value = true;
  http
    .get("/gateway", {
      params: {
        cityId: "330100",
        pageNum:pageNum.value,
        pageSize: 10,
        type: active + 1,
        k: "5691835",
      },
    })
    .then((res) => {
        let data=res.data.data.films;
        if(data.length<=0){
            finished.value = true;
        }else{
            // reactive在此处修改值时不能直接赋值,会改变数据类型
            films.push(...res.data.data.films);
            // 加载状态结束
            loading.value = false;
        }
    });
  // 异步更新数据
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  console.log(pageNum);
  onLoad();
};

function collectFilm(film){
  store.commit("add_collect_film",film)
}
</script>

<style lang="scss" scoped>
</style>