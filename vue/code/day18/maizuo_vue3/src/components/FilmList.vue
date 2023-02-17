<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell v-for="item in films" :key="item.filmId">
        <div class="list">
          <van-image
              width="66"
              height="92"
              style="margin-right: 8px"
              :src="item.poster"/>
          <div style="width: 200px">
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
                      style="margin-left: 35px;padding: 5px 10px;"
          @click="collectFilm(item)"
          >收藏</van-button>
        </div>
      </van-cell>
    </van-list>
  </van-pull-refresh>

</template>

<script setup>
import http from "@/utils/request2.js"
import {ref, reactive} from "vue";
import {useStore} from "vuex"

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
var films = reactive([]);
let pageNum = ref(0)
let {active} = defineProps(["active"])
const store=useStore();
const onLoad = () => {
  pageNum.value++;
  // 加载状态开始
  loading.value = true;
  http.get("/gateway", {
    params: {
      cityId: "330100",
      pageNum: pageNum.value,
      pageSize: 10,
      type: active + 1,
      k: "5691835",
    },
  }).then(res => {
    console.log(res)
    let data = res.data.data.films;
    if (data.length <= 0) {
      finished.value = true
    } else {
      // reactive在此处修改值时不能直接赋值,会改变数据类型
      films.push(...res.data.data.films)
      // 加载状态结束
      loading.value = false;
    }

  })
};

/*
//下拉刷新
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};*/

function collectFilm(film) {
  store.commit("add_collect_film", film)
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.list {
  display: flex;
  align-items: center;
  height: 94px;
  padding: 15px 15px 15px 0;
}

.type {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
}

.act {
  width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: #797d82
}


</style>