<template>
  <div class="content">
    燕王judy:{{grade}}
    <button @click="work">干活</button>
  </div>
</template>

<script>
export default {
    data:function(){
        return {
            grade:""
        }
    },
    methods:{
        work:function(){
            this.grade="郑和下西洋,修永乐大典,封狼居胥"
        }
    },
    created:function(){
        console.log("朱棣组件被创建了");
    },
    mounted:function(){
        console.log("朱棣组件被挂载了");
    },
    destroyed:function(){
        console.log("朱棣组件被销毁了");
    }
}
</script>

<style scoped>
    .content{
        height: 200px;
        background: blue;
    }
</style>