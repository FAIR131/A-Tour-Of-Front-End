<template>
  <div id="myChild">
    <!-- ref属性用于获取元素或子组件的引用,通过实例上的$refs可以获取声明好的引用 -->
    <p ref="myPNode">这是我的孩子</p>
    <hr/>
    <MyGrandChild ref="mygrandchild"></MyGrandChild>
    <hr/>
    <button @click="sendForBro" ref="myBtn">给兄弟传值</button>
    <button @click="getRef">获取引用</button>
  </div>
</template>

<script>
// import bus from '../bus'
import MyGrandChild from './MyGrandChild.vue'
export default {
  components:{
    MyGrandChild
  },
  methods:{
    sendForBro:function(){
      this.$bus.$emit("bro","大兄弟我来了")
    },
    getRef:function(){
      // console.log(this.$refs);
      // console.log(this.$refs.myPNode);
      // console.log(this.$refs.mygrandchild.msg);

      // 通过组件实例上的$parent可以获取当前组件的父组件实例
      // console.log(this.$parent.money);

      // 通过组件实例上的$children可以获取当期组件的所有子组件
      // console.log(this.$children[0].msg);

      // 通过组件实例上的$root可以直接获取vue实例,无论这个组件的层级有多深
      // console.log(this.$root);
    }
  }
}
</script>

<style>

</style>