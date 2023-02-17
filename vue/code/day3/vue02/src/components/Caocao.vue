<template>
<div>
  <div>曹操</div>
  <hr>
  <caopi></caopi>
</div>
</template>

<script>
import Caopi from "@/components/Caopi";
export default {
  name: "Caocao",
  components:{
    Caopi
  },

  data:function (){
    return{
      food: '饺子',
       msg:'哈哈'
    }
  },
  //provide可以暴露数据和方法给后代组件使用
  //后代组件通过inject注入到组件实例上
  //如果多个祖先组件provide同名变量，就近获得
  //哪个组件注入provide中的内容,this就指向哪个组件

/*
  provide:{
    sword:'青缸剑',
    words:this.msg,
    getJiaozi:function (food){
      console.log('12345')
    }
  },
*/
  //provide函数的形式，可以将当前组件的数据或方法暴露出去，而对象的方式不能
  provide:function(){
    return{
      sword:'青缸剑',
      words:this.msg,
      getJiaozi:function (food){
        console.log('12345'+this.food)
        //谁注入进去this就指向谁
        // console.log(this.msg)
      }
    }
  },


}
</script>

<style scoped>

</style>