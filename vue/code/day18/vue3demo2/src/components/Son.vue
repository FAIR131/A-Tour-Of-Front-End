<template>
<div>
  我是儿子：{{money}}
</div>
</template>

<script setup>
import {inject} from "vue";
//defineProps声明要接收的父组件参数,直接使用
let props=defineProps(["money"])

// defineEmits声明要触发的自定义事件,直接使用
let emits=defineEmits(["getMoney"])
emits("getMoney",props.money*2)
// 注入数据,设置默认值
let house=inject("house","maowu")
console.log(house);
let kongfu=inject("kongfu")
kongfu()

</script>

<style scoped>

</style>