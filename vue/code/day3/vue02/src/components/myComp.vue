<template>
  <div>
    <div>我是一个乖组件</div>
    <hr>
    <p class="myNum">
      {{num}}
    </p>
    <button @click="changeNum">改值</button>
    <hr>
    <myChild></myChild>
    <hr>
    <mySon :money="money" @getMoney="getSonMoney"></mySon>
  </div>

</template>

<script>
import myChild from "./myChild.vue";
import mySon from "./MySon.vue";
export default {
  name: "myComp",
  data:function (){
    return {
      num:0,
      money:100
    }
  },
  methods:{
    changeNum:function (){
      this.num++
    },
    getSonMoney:function (params){
      console.log('函数执行了',params)
    }
  },
  components:{
    myChild,
    mySon
  }
}
</script>

<style scoped>
.myNum{
  color: red;
}
</style>