<template>
  <div id="myComp">
    我是一个很乖的组件
    <hr />
    <p class="my-num">{{ num }}</p>
    <button @click="changeNum">改值</button>
    <hr/>
    <MyChild></MyChild>
    <hr/>
    <MySon :money="money" @getMoney="getSonMoney"></MySon>
  </div>
</template>
<script>
import MyChild from "./MyChild.vue";
import MySon from "./MySon.vue"
export default {
  components: {
    MyChild,MySon
  },
  data: function () {
    return {
      num: 0,
      money:100
    };
  },
  methods: {
    changeNum: function () {
      this.num++;
    },
    getSonMoney:function(params,words){
        console.log("getSonMoney函数被执行了",params,words);
    }
  },
};
</script>
<style>
.my-num {
  color: red;
}
</style>