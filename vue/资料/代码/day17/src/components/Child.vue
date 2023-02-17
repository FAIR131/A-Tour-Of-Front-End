<template>
  <div>
    子组件:{{ money }}
    <button @click="sendMoney">孝敬爸爸</button>
  </div>
</template>

<script>
export default {

  // 组合式api中,setup函数第一个参数就是自定义属性接收的值,同时必须写好props选项接收
  props: ["money"],
  setup(props,context) {
    // console.log(props.money);
    let sendMoney=function(){
        context.emit("getMoney",props.money*2)
    }
    return {
        sendMoney
    }
  },
};
</script>

<style>
</style>