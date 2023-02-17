<template>
  <div>
    曹丕{{sword}}
    <hr/>
    <Caorui></Caorui>
  </div>
</template>

<script>
import Caorui from './Caorui.vue'
export default {
    components:{
        Caorui
    },
    inject:["sword"],
    provide:{
        sword:"七星剑"
    }
}
</script>

<style>

</style>