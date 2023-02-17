<template>
  <div class="my-son">
   <p> 我是好大儿:{{money}}</p>
    <button @click="makeMoney">赚钱</button>
    <button @click="burnMoney">给爷爷烧钱</button>
  </div>
</template>

<script>
// import bus from '../bus'
export default {
    // 父组件传值给子组件通过自定义属性,子组件通过props配置项声明接收的自定义属性,props中的变量可用不可改
    // props:["money"]
    // props:{
    //     money:Number
    // }
    props:{
        money:{
            type:Number,
            default:0
        }
    },
    methods:{
        makeMoney:function(){
            // console.log(this.money);
            // 子组件传值给父组件时,父组件声明自定义事件,子组件通过$emit触发
            this.$emit("getMoney",this.money*2,"哈哈")
        },
        burnMoney:function(){
            this.$bus.$emit("grandpa",this.money*10000)
        }
    },
    mounted:function(){
        this.$bus.$on("bro",function(params){
            console.log("事件总线注册的bro事件被执行了",params);
        })
    }
}
</script>

<style>

</style>