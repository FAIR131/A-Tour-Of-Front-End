<template>
  <div>
    <!--    ref属性用于获取元素或子组件的引用，通过实例上的$refs 可以获取声明好的引用-->
    <div ref="myNode">这是我的孩子</div>
    <hr>
    <button @click="sendForBro">给兄弟传值</button>
    <button @click="getRef">获取引用</button>
    <hr>
    <my-grandson ref="myGrandSon"></my-grandson>
  </div>

</template>

<script>
import bus from "@/bus";
import myGrandson from "@/components/MyGrandson";

export default {
  name: "myChild",
  methods: {
    sendForBro: function () {
      bus.$emit('bro', '兄弟我来了')
    },
    getRef: function () {
      // console.log(this.$refs)
      // console.log(this.$refs.myGrandSon.msg)

      console.log(this.$parent.money)

      console.log(this.$children[0].msg)

      console.log(this.$root)


    }
  },
  components: {
    myGrandson
  }

}
</script>

<style scoped>

</style>