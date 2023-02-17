<template>
  <div>
<!--    provide可以暴露数据和方法给后代组件使用-->
<!--    后代组件通过inject注入到组件实例上-->
<!--    -->
    <div>曹睿:{{sword}}{{getJiaozi()}}--{{words}}</div>
  </div>
</template>

<script>
export default {
  name: "Caorui",
  inject:['sword','getJiaozi','words'],
  data:function (){
    return{
     food: '面条',
      msg:'呵呵'
    }
  }
}
</script>

<style scoped>

</style>