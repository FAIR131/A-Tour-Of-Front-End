<template>
  <div>
    谢永强:{{car}}--{{$attrs.house}}
    <hr/>
    <Xiefeiji v-bind="$attrs" v-on="$listeners"></Xiefeiji>
  </div>
</template>

<script>
import Xiefeiji from './Xiefeiji.vue'
export default {
    components:{
        Xiefeiji
    },
    props:["car"],
    mounted:function(){
        // 组件实例上的$attrs也可以直接获取父组件传递的自定义属性,props声明的除外
        // $attrs可以继续往后代组件传递
        // console.log(this.$attrs);

        // 组件实例上的$listeners也可以直接获取父组件声明的自定义事件的函数
        // console.log(this.$listeners);
        this.$listeners.fight(500)
    }
}
</script>

<style>

</style>