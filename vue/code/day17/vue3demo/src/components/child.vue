<template>
  <div>
    努力挣钱:{{money}}
    <button @click="sendMoney">孝敬巴巴</button>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  name: "child",
  //组合式api中，setup函数第一个参数就是自定义属性，同时必须写好props选项接收
  props: {
    money: {
      type: Number,
      default: 0,
     /* validator(val) {
        if (val % 2 === 0) {
          return true
        } else {
          return false
        }
      }*/
    }
  },
  setup(props,context){
    let sendMoney=function (){
      context.emit('getMoney',props.money*2)
    }
     /*computed(){

    }*/

    return{
      sendMoney
    }
  }
}
</script>

<style scoped>

</style>