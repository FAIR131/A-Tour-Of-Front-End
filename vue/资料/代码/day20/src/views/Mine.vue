<template>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
        <van-cell v-for="item in films" :key="item.filmId" :title="item.filmId">

            <van-image width="100" height="100" :src="item.poster" />
            <h1>{{ item.name }}</h1>
            <span>{{ item.runtime }}</span>
            <!-- <van-button type="primary" @click="collectFilm(item)">收藏</van-button> -->
        </van-cell>
    </van-list>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useStore } from 'vuex'
import { filmType } from '../types'
const active = ref<number>(0);
const store = useStore();
let films = reactive<Array<filmType>>(store.state.collect_films)
let loading = ref(false);
const finished = ref(false);


</script>

<style scoped>

</style>