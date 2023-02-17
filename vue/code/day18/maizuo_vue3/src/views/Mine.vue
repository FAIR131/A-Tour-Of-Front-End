<template>
  <div>
    {{ store.state.collect_films }}
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();

const router = useRouter();
const route = useRoute();

// 路由对象
console.log(router);

// 当前路由
console.log(route);
</script>

<style lang="scss" scoped>
</style>