<template>
  <div>
    <div>
      影院
    </div>
    <hr>
    <p>
      store中count 的值{{$store.state.count}}---{{$store.getters.myCount}}
    </p>
    <button @click="changeCount">修改值</button>
  </div>
</template>

<script>
export default {
  name: "Cinema",
  methods:{
    changeCount() {
      // console.log(this.$store.state.count)
      //通过store上的commit方法可以调用mutation函数
      // this.$store.dispatch('increment',10)
      //
      //通过store上的dispatch方法可以调用actions函数
      this.$store.dispatch('increment',13)
    }
  }
}
</script>

<style scoped>

</style>