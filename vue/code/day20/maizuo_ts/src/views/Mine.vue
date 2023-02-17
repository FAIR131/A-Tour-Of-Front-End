<template>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"

  >
    <van-cell v-for="item in films" :key="item.filmId">
      <div class="list">
        <van-image
            width="66"
            height="92"
            style="margin-right: 8px"
            :src="item.poster"/>
        <div style="width: 170px">
          <p style="font-size: 16px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
            {{ item.name }} <span class="type">{{ item.filmType.name }}</span>
          </p>
          <p style="font-size: 13px;color: #797d82">
            观众评分 <span style="color:#ff5f16;">{{ item.grade }}</span>
          </p>
          <p class="act">
            主演: <span v-for="(actor,index) in item.actors" :key="item.index">&nbsp;{{ actor.name }}</span>
          </p>
          <p style="font-size: 13px;color: #797d82">
            {{ item.nation }} | {{ item.runtime }}分钟
          </p>
        </div>
        <van-button plain
                    color="#ff5f16" size="small"
                    style="margin-left: 30px;padding: 5px 10px;width: 50px"
                    @click="collectFilm(item)"
        >取消收藏
        </van-button>
      </div>
    </van-cell>
  </van-list>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {filmType} from "@/types";
import {useStore} from "vuex";

const active = ref<number>(0);
const store = useStore()
let films = reactive<Array<filmType>>(store.state.collect_films);
const loading = ref(false);
const finished = ref(false);
</script>

<style scoped>

</style>