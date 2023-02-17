<template>
  <div>
    <div>曹丕{{sword}}</div>
    <hr>
    <caorui></caorui>
  </div>
</template>

<script>
import caorui from "@/components/Caorui";
export default {
  name: "Caopi",
  components: {
    caorui
  },
  inject:['sword'],
  provide:{
    sword:'七星剑'
  }

}
</script>

<style scoped>

</style>