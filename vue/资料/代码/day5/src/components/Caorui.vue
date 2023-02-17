<template>
  <div>
    曹睿:{{sword}}{{getJiaozi()}}---{{words}}
  </div>
</template>

<script>
export default {

    // provide可以暴露数据和方法给后代组件使用
    // 后代组件通过inject注入到组件实例上
    // 如果多个祖先组件Provide同名的变量,则就近获取
    // 哪个组件注入provide中的内容,this就指向哪个组件
    inject:["sword","getJiaozi","words"],
    data:function(){
        return {
            foods:"面条"
        }
    }

}
</script>

<style>

</style>