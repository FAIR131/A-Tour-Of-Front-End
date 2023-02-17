<template>
  <div id="app">
    <!-- {{words}} -->
    
    <!-- <MyComp></MyComp> -->
    <Caocao></Caocao>
  </div>
</template>

<script>
import MyComp from './components/MyComp.vue'
// import bus from './bus'
import Caocao from './components/Caocao.vue'
export default {
  name: 'App',
  components: {
    MyComp,Caocao
  },
  data:function(){
    return {
      words:"today is a nice day"
    }
  },
  mounted:function(){
    this.$bus.$on("grandpa",function(params){
      console.log("grandpa函数被执行了,接收参数:",params);
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
