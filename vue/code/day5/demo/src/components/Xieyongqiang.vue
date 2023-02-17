<template>
<div>
  <div>谢永强--{{car}}</div>
  <hr>
<xiefeiji v-bind="$attrs" v-on="$listeners"></xiefeiji>
</div>
</template>

<script>
import xiefeiji from "@/components/Xiefeiji";
export default {
  name: "Xieyongqiang",
  components:{
    xiefeiji
  },
  props:['car'],
  mounted() {
    //组件实例上的$attrs也可以直接获取父组件的自定义属性，props声明的除外
    console.log(this.$attrs)
    //组件实例上的$listener也可以直接获取父组件声明的自定义事件的函数
    console.log(this.$listeners)
    //可以传参
    this.$listeners.fight(500)
  }
}
</script>

<style scoped>

</style>