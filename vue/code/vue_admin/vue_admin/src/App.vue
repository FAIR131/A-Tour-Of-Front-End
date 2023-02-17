<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useCounterStore } from './stores/counter';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const store = useCounterStore()
let Router = useRouter()

onMounted(() => {
  let user = sessionStorage.getItem('user');
  if (user) {
    store.login = JSON.parse(user)
  } else {
    Router.push('login')
  }
})
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  /* background-color: #5dbe8a; */
}

* {
  margin: 0;
  padding: 0;
}
</style>
