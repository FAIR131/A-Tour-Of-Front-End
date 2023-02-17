<template>
  <div class="content">
    <span>燕王朱棣 : {{grade}}</span>

    <button @click="work">干活</button>
  </div>
</template>

<script>
export default {
  name: "Zhudi",
  data(){
    return{
      grade:''
    }
  },
  methods:{
    work(){
      this.grade='郑和下西洋，修永乐大典，封狼居胥'
    }
  }
}
</script>

<style scoped>
.content{
  width: 500px;
  height: 100px;
  background-color: skyblue;
}
</style>