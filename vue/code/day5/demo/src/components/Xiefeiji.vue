<template>
<div>
  <div>谢飞机</div>
  <hr>

</div>
</template>

<script>
export default {
  name: "Xiefeiji",
  mounted() {
    console.log(this.$attrs)
    console.log(this.$listeners)
    this.$listeners.fight(1000)
  }
}
</script>

<style scoped>

</style>