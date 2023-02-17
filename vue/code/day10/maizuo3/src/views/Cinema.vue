<template>
  <div>
    <!--      <div>
         影院
       </div>

    <p>
         store中count 的值{{$store.state.count}}-&#45;&#45;{{$store.getters.myCount}}
       </p>
       <button @click="changeCount">修改值</button>-->
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
  },
  mounted:async function() {
   let res = await this.$http.get("/?cityId=330100&ticketFlag=1&k=9683863")
    // console.log(res)

  },


}
</script>

<style scoped>

</style>