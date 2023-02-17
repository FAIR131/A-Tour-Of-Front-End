<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default{
    methods:{
      ...mapMutations(["init_current_user"])
    },
    mounted:function(){
      let currentUser=sessionStorage.getItem("currentUser");

      if(currentUser){        
        // sessionStorage中取到了当前用户数据
        this.init_current_user(JSON.parse(currentUser))
      }else{
        // 没取到数据
        this.$router.push("/login")
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*{
  margin:0;
  padding:0;
}
html,body,#app{
  height:100%;
}
</style>
