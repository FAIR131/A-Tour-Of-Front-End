<template>
  <div>
    曹操
    <hr />
    <Caopi></Caopi>
  </div>
</template>

<script>
import Caopi from "./Caopi.vue";
export default {
  components: {
    Caopi,
  },
  data: function () {
    return {
      foods: "饺子",
      msg: "哈哈",
    };
  },
  // provide: {
  //   sword: "青釭剑",
  //   words: this.msg,
  //   getJiaozi: function () {
  //     console.log("好吃不过" + this.foods);
  //   },
  // },

  // provide函数的形式可以将当前组件的数据或方法暴露出去,而对象的方式则不可以
    provide: function () {
      return {
        sword: "青釭剑",
        words:this.msg,
        getJiaozi: function () {
          console.log("好吃不过"+this.foods);
        },
      };
    },
};
</script>

<style>
</style>