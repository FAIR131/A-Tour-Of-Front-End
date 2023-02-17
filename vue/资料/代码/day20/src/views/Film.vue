<template>
    <van-tabs v-model:active="active">
        <van-tab title="正在热映">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="item in films" :key="item.filmId" :title="item.filmId">

                    <van-image width="100" height="100" :src="item.poster" />
                    <h1>{{item.name}}</h1>
                    <span>{{item.runtime}}</span>
                    <van-button type="primary" @click="collectFilm(item)">收藏</van-button>
                </van-cell>
            </van-list>
        </van-tab>
        <van-tab title="即将上映">内容 2</van-tab>
    </van-tabs>

</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
import http from '../utils/request'
import {filmType} from '../types'
import { useStore } from 'vuex'

const active = ref<number>(0);
let films = reactive<Array<filmType>>([])
let loading = ref(false);
const finished = ref(false);
const store=useStore();
const onLoad = () => {
    http.get("/gateway", {
      params: {
        cityId: "330100",
        pageNum:1,
        pageSize: 10,
        type: 1,
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
};

let collectFilm=function(film:filmType){
    store.commit("add_collect_film",film)
}
</script>

<style scoped>

</style>