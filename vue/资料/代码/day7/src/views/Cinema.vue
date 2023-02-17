<template>
  <div>
    影院
    <hr/>
    <p>
      store中count的值:{{$store.state.count}}---{{$store.getters.myCount}}
      <hr/>
      <button @click="changeCount">修改count</button>
    </p>
  </div>
</template>

<script>
export default {
  methods:{
    changeCount:function(){
      // console.log(this.$store.state.count)
      // 通过store上的commit方法可以调用mutations函数
      // this.$store.commit("increment",10)

      // 通过store上的dispatch方法可以调用actions函数
      this.$store.dispatch("increment",13)
    }
  }
}
</script>

<style>

</style>