<template>
<div>
  <div>谢广坤</div>
  <hr>
  <xieyongqiang :house="vally" :car="car" @fight="fight"></xieyongqiang>

</div>
</template>

<script>
import xieyongqiang from "@/components/Xieyongqiang";
export default {
  name: "Xieguangkun",
  components:{
    xieyongqiang
  },
  data(){
    return{
      vally:'别墅',
      car:'三轮车'
    }
  },
  methods:{
    fight(param){
      console.log('来打我呀',param)
    }
  }
}
</script>

<style scoped>

</style>