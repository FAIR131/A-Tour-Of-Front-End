<template>
  <div>
    谢广坤
    <hr/>
    <Xieyongqiang  :house="vally" :car="car" @fight="fight"></Xieyongqiang>
  </div>
</template>

<script>
import Xieyongqiang from './Xieyongqiang.vue'
export default {
    components:{
        Xieyongqiang
    },
    data:function(){
        return {
            vally:"别墅",
            car:"三轮电动车"
        }
    },
    methods:{
        fight:function(params){
            console.log("你打死他",params);
        }
    }
}
</script>

<style>

</style>