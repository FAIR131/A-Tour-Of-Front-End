<template>
  <div>
    我的
    <button @click="toNews">去新闻页</button>
  </div>
</template>

<script>
export default {
  methods:{
    toNews:function(){
      // this.$router.push("/news/abc456")
      this.$router.push({name:"xinwen",params:{id:"haha123"}})

      // 通过命名路由也可以跳转
      // this.$router.push({name:"xinwen"})

      // 通过query方式跳转到目标页面后,可以通过路由对象中的currentRoute中的query去获取
      // console.log(this.$router.currentRoute.query);
    }
  }
}
</script>

<style>

</style>