<template>
  <div>
    {{num}}--{{ numPlus }}
    {{user.username }}
    <button @click="changeNum">改值</button>
    <Son :money="200" @getMoney="getMoney"></Son>
  </div>
</template>

<script setup>
//setup语法糖写法（单文件组件）
import Son from "@/components/Son.vue"
import {computed, reactive, ref,provide,defineExpose,toRefs} from "vue";

let num = ref(99);
let user = reactive({username: '王二麻子', age: 30})

function changeNum() {
  num.value++
}

let numPlus = computed(() => num.value * 2)
let getMoney = function (params) {
  console.log('子组件传过来的值：', params)
}

provide("house","vally")
provide("kongfu", () => {
  console.log("打狗棍")
})


</script>

<style lang="scss" scoped>
</style>