<template>
  <div>
    <div>
      新闻
    </div>
    <button @click="goBack">回退</button>
  </div>
</template>

<script>
export default {
  name: "News",
  methods:{
    goBack(){
      // go是跳转到路由栈中的某一页,正数是前进,负数是后退,0是刷新当前页
      this.$router.go(-2);
      // 通过路由对象中currentRoute里的params可以获取动态路由传参
      console.log(this.$router.currentRoute.params);
    }
  }
}
</script>

<style scoped>

</style>