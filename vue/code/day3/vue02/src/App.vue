<template>
  <div id="app">
    <div>
      <img alt="Vue logo" src="./assets/logo.png">
<!--      <p>{{ words }}</p>-->
<!--      <my-comp></my-comp>-->
      <caocao></caocao>
    </div>
  </div>
</template>

<script>
import caocao from "@/components/Caocao";
// import bus from "./bus";
import MyComp from "./components/myComp";

export default {
  name: 'App',
  components: {
    MyComp,
    caocao
  },
  data: function () {
    return {
      words: 'abcd'
    }
  },
  mounted:function () {
    this.$bus.$on('grandpa',function (params){
      console.log('gp函数被执行了',params)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
